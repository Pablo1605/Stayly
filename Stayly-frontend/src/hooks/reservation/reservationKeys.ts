export const reservationKeys = {
  all: ["reservations"] as const,
  list: () => [...reservationKeys.all] as const,
  mine: () => [...reservationKeys.all, "mine"] as const,
  detail: (reservationId: number) => [...reservationKeys.all, reservationId] as const,
  byAccommodation: (accommodationId: number) =>
    [...reservationKeys.all, "accommodation", accommodationId] as const,
};
