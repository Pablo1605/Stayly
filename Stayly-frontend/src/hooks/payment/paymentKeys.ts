export const paymentKeys = {
  all: ["payments"] as const,
  list: () => [...paymentKeys.all] as const,
  detail: (reservationId: number) => [...paymentKeys.all, reservationId] as const,
};
