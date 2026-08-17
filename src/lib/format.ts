export function formatPrice(value: number | null | undefined) {
  if (value == null) return "Consulte";
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export const ORDER_STATUS_LABEL: Record<string, string> = {
  RECEBIDO: "Recebido",
  EM_PREPARO: "Em preparo",
  PRONTO: "Pronto",
  ENTREGUE: "Entregue",
  CANCELADO: "Cancelado",
};

export const RESERVATION_STATUS_LABEL: Record<string, string> = {
  PENDENTE: "Pendente",
  CONFIRMADA: "Confirmada",
  CANCELADA: "Cancelada",
};

export const NEXT_ORDER_STATUS: Record<string, string | null> = {
  RECEBIDO: "EM_PREPARO",
  EM_PREPARO: "PRONTO",
  PRONTO: "ENTREGUE",
  ENTREGUE: null,
  CANCELADO: null,
};
