"use server";

import { redirect } from "next/navigation";
import {
  createAdminSession,
  destroyAdminSession,
  destroyCustomerSession,
  isAdminAuthenticated,
  verifyAdminCredentials,
} from "@/lib/auth";
import { SITE } from "@/lib/site";

async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }
}

function fail(path: string, error: string): never {
  const sep = path.includes("?") ? "&" : "?";
  redirect(`${path}${sep}error=${encodeURIComponent(error)}`);
}

function whatsappHref(text: string) {
  return `${SITE.phoneHref}?text=${encodeURIComponent(text)}`;
}

export async function loginAdminAction(formData: FormData): Promise<void> {
  const user = String(formData.get("user") || "").trim();
  const password = String(formData.get("password") || "");

  if (!process.env.ADMIN_PASSWORD?.trim()) {
    fail("/admin/login", "Login admin ainda não configurado.");
  }

  if (!verifyAdminCredentials(user, password)) {
    fail("/admin/login", "Usuário ou senha inválidos.");
  }

  await createAdminSession();
  redirect("/admin");
}

export async function logoutAdminAction(): Promise<void> {
  await destroyAdminSession();
  redirect("/admin/login");
}

export async function logoutCustomerAction(): Promise<void> {
  await destroyCustomerSession();
  redirect("/");
}

export async function registerCustomerAction(): Promise<void> {
  fail(
    "/cadastro",
    "Cadastro em breve. Por enquanto, fale com a casa pelo WhatsApp.",
  );
}

export async function loginCustomerAction(): Promise<void> {
  fail(
    "/login",
    "Login de cliente em breve. Por enquanto, fale com a casa pelo WhatsApp.",
  );
}

export async function saveCategoryAction(): Promise<void> {
  await requireAdmin();
  fail("/admin/cardapio", "Edição do cardápio volta quando o banco estiver no ar.");
}

export async function deleteCategoryAction(): Promise<void> {
  await requireAdmin();
  fail("/admin/cardapio", "Edição do cardápio volta quando o banco estiver no ar.");
}

export async function saveProductAction(): Promise<void> {
  await requireAdmin();
  fail("/admin/cardapio", "Edição do cardápio volta quando o banco estiver no ar.");
}

export async function deleteProductAction(): Promise<void> {
  await requireAdmin();
  fail("/admin/cardapio", "Edição do cardápio volta quando o banco estiver no ar.");
}

export async function toggleProductAction(): Promise<void> {
  await requireAdmin();
  fail("/admin/cardapio", "Edição do cardápio volta quando o banco estiver no ar.");
}

export async function createOrderAction(formData: FormData): Promise<void> {
  const notes = String(formData.get("notes") || "").trim();
  const channel = String(formData.get("channel") || "RESTAURANTE");
  const rawItems = String(formData.get("items") || "[]");
  let items: { name: string; price: number; qty: number }[] = [];
  try {
    items = JSON.parse(rawItems);
  } catch {
    fail("/pedidos", "Pedido inválido.");
  }
  items = items.filter((item) => item.qty > 0);
  if (items.length === 0) {
    fail("/pedidos", "Adicione itens ao pedido.");
  }

  const lines = items.map((item) => `${item.qty}x ${item.name}`);
  const label = channel === "EMPORIO" ? "Empório" : "Restaurante";
  const text = [
    `Pedido Lake 'n Fire (${label})`,
    ...lines,
    notes ? `Obs: ${notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  redirect(whatsappHref(text));
}

export async function updateOrderStatusAction(): Promise<void> {
  await requireAdmin();
  fail("/admin/pedidos", "Pedidos voltam quando o banco estiver no ar.");
}

export async function createReservationAction(formData: FormData): Promise<void> {
  const name = String(formData.get("nome") || "").trim();
  const phone = String(formData.get("telefone") || "").trim();
  const date = String(formData.get("data") || "").trim();
  const time = String(formData.get("horario") || "").trim();
  const partySize = Number(formData.get("pessoas") || 0);
  const notes = String(formData.get("obs") || "").trim();

  if (!name || !phone || !date || !time || partySize < 1) {
    fail("/reservas", "Preencha nome, telefone, data, horário e pessoas.");
  }

  const text = [
    "Reserva Lake 'n Fire",
    `Nome: ${name}`,
    `WhatsApp: ${phone}`,
    `Data: ${date}`,
    `Horário: ${time}`,
    `Pessoas: ${partySize}`,
    notes ? `Obs: ${notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  redirect(whatsappHref(text));
}

export async function updateReservationStatusAction(): Promise<void> {
  await requireAdmin();
  fail("/admin/reservas", "Reservas voltam quando o banco estiver no ar.");
}
