"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import {
  createAdminSession,
  createCustomerSession,
  destroyAdminSession,
  destroyCustomerSession,
  getCustomerId,
  isAdminAuthenticated,
  verifyAdminCredentials,
} from "@/lib/auth";
import { prisma } from "@/lib/db";
import type {
  Channel,
  OrderStatus,
  ReservationStatus,
} from "@/generated/prisma";

async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function digits(value: string) {
  return value.replace(/\D/g, "");
}

export async function loginAdminAction(formData: FormData) {
  const user = String(formData.get("user") || "").trim();
  const password = String(formData.get("password") || "");

  if (!process.env.ADMIN_PASSWORD?.trim()) {
    return { ok: false as const, error: "Login admin ainda não configurado." };
  }

  if (!verifyAdminCredentials(user, password)) {
    return { ok: false as const, error: "Usuário ou senha inválidos." };
  }

  await createAdminSession();
  redirect("/admin");
}

export async function logoutAdminAction() {
  await destroyAdminSession();
  redirect("/admin/login");
}

export async function logoutCustomerAction() {
  await destroyCustomerSession();
  redirect("/");
}

export async function registerCustomerAction(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const address = String(formData.get("address") || "").trim();
  const cpf = digits(String(formData.get("cpf") || ""));
  const password = String(formData.get("password") || "");
  const confirm = String(formData.get("confirm") || "");

  if (!name || !phone || !email || !address || !cpf || !password) {
    return { ok: false as const, error: "Preencha todos os campos." };
  }
  if (cpf.length !== 11) {
    return { ok: false as const, error: "CPF inválido." };
  }
  if (password.length < 6) {
    return { ok: false as const, error: "A senha precisa ter pelo menos 6 caracteres." };
  }
  if (password !== confirm) {
    return { ok: false as const, error: "As senhas não coincidem." };
  }

  const exists = await prisma.customer.findUnique({ where: { email } });
  if (exists) {
    return { ok: false as const, error: "Já existe uma conta com este e-mail." };
  }

  const customer = await prisma.customer.create({
    data: {
      name,
      phone,
      email,
      address,
      cpf,
      passwordHash: await bcrypt.hash(password, 10),
    },
  });

  await createCustomerSession(customer.id);
  redirect("/pedidos");
}

export async function loginCustomerAction(formData: FormData) {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  const next = String(formData.get("next") || "/pedidos");

  const customer = await prisma.customer.findUnique({ where: { email } });
  if (!customer || !(await bcrypt.compare(password, customer.passwordHash))) {
    return { ok: false as const, error: "E-mail ou senha inválidos." };
  }

  await createCustomerSession(customer.id);
  redirect(next.startsWith("/") ? next : "/pedidos");
}

export async function saveCategoryAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const title = String(formData.get("title") || "").trim();
  const subtitle = String(formData.get("subtitle") || "").trim();
  const channel = String(formData.get("channel") || "RESTAURANTE") as Channel;
  const sortOrder = Number(formData.get("sortOrder") || 0);
  const slugInput = String(formData.get("slug") || "").trim();

  if (!title) return { ok: false as const, error: "Informe o nome da categoria." };

  const slug = slugify(slugInput || title);
  const data = { title, subtitle, channel, sortOrder, slug };

  if (id) {
    await prisma.category.update({ where: { id }, data });
  } else {
    await prisma.category.create({ data });
  }

  revalidatePath("/admin/cardapio");
  revalidatePath("/cardapio");
  revalidatePath("/pedidos");
  revalidatePath("/emporio");
  revalidatePath("/");
  redirect("/admin/cardapio");
}

export async function deleteCategoryAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  await prisma.category.delete({ where: { id } });
  revalidatePath("/admin/cardapio");
  revalidatePath("/cardapio");
  revalidatePath("/");
  redirect("/admin/cardapio");
}

export async function saveProductAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const categoryId = String(formData.get("categoryId") || "");
  const name = String(formData.get("name") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const note = String(formData.get("note") || "").trim();
  const portion = String(formData.get("portion") || "").trim();
  const priceRaw = String(formData.get("price") || "").replace(",", ".");
  const price = priceRaw === "" ? null : Number(priceRaw);
  const available = formData.get("available") === "on";
  const sortOrder = Number(formData.get("sortOrder") || 0);

  if (!name || !categoryId) {
    return { ok: false as const, error: "Nome e categoria são obrigatórios." };
  }

  const data = {
    categoryId,
    name,
    description,
    note,
    portion,
    price: Number.isFinite(price as number) ? price : null,
    available,
    sortOrder,
  };

  if (id) {
    await prisma.product.update({ where: { id }, data });
  } else {
    await prisma.product.create({ data });
  }

  revalidatePath("/admin/cardapio");
  revalidatePath(`/admin/cardapio/${categoryId}`);
  revalidatePath("/cardapio");
  revalidatePath("/pedidos");
  revalidatePath("/emporio");
  revalidatePath("/");
  redirect(`/admin/cardapio/${categoryId}`);
}

export async function deleteProductAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const categoryId = String(formData.get("categoryId") || "");
  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/cardapio");
  revalidatePath(`/admin/cardapio/${categoryId}`);
  revalidatePath("/cardapio");
  redirect(`/admin/cardapio/${categoryId}`);
}

export async function toggleProductAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return;
  await prisma.product.update({
    where: { id },
    data: { available: !product.available },
  });
  revalidatePath("/admin/cardapio");
  revalidatePath(`/admin/cardapio/${product.categoryId}`);
  revalidatePath("/cardapio");
  revalidatePath("/pedidos");
}

export async function createOrderAction(formData: FormData) {
  const customerId = await getCustomerId();
  if (!customerId) {
    redirect("/login?next=/pedidos");
  }

  const channel = String(formData.get("channel") || "RESTAURANTE") as Channel;
  const notes = String(formData.get("notes") || "").trim();
  const rawItems = String(formData.get("items") || "[]");

  let items: { id?: string; name: string; price: number; qty: number }[] = [];
  try {
    items = JSON.parse(rawItems);
  } catch {
    return { ok: false as const, error: "Pedido inválido." };
  }

  items = items.filter((item) => item.qty > 0 && item.price != null);
  if (items.length === 0) {
    return { ok: false as const, error: "Adicione itens ao pedido." };
  }

  const customer = await prisma.customer.findUnique({ where: { id: customerId } });
  if (!customer) {
    redirect("/login?next=/pedidos");
  }

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  await prisma.order.create({
    data: {
      customerId: customer.id,
      channel,
      total,
      notes,
      customerName: customer.name,
      customerPhone: customer.phone,
      items: {
        create: items.map((item) => ({
          productId: item.id || null,
          name: item.name,
          price: item.price,
          qty: item.qty,
        })),
      },
    },
  });

  revalidatePath("/admin/pedidos");
  revalidatePath("/conta");
  redirect("/conta?pedido=ok");
}

export async function updateOrderStatusAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "") as OrderStatus;
  await prisma.order.update({ where: { id }, data: { status } });
  revalidatePath("/admin/pedidos");
}

export async function createReservationAction(formData: FormData) {
  const name = String(formData.get("nome") || "").trim();
  const phone = String(formData.get("telefone") || "").trim();
  const date = String(formData.get("data") || "").trim();
  const time = String(formData.get("horario") || "").trim();
  const partySize = Number(formData.get("pessoas") || 0);
  const notes = String(formData.get("obs") || "").trim();

  if (!name || !phone || !date || !time || partySize < 1) {
    return { ok: false as const, error: "Preencha nome, telefone, data, horário e pessoas." };
  }

  const customerId = await getCustomerId();

  await prisma.reservation.create({
    data: {
      customerId,
      name,
      phone,
      date,
      time,
      partySize,
      notes,
    },
  });

  revalidatePath("/admin/reservas");
  revalidatePath("/conta");
  redirect("/reservas?ok=1");
}

export async function updateReservationStatusAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "") as ReservationStatus;
  await prisma.reservation.update({ where: { id }, data: { status } });
  revalidatePath("/admin/reservas");
}
