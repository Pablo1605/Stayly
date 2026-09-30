export const queryKeys = {
    accommodations: ["accommodations"] as const,
    accommodation: (id: number) => ["accommodations", id] as const,
    accommodationSearch: (query: unknown) => ["accommodations", "search", query] as const,
    favorites: ["favorites"] as const,
    ratings: (accommodationId: number) => ["ratings", accommodationId] as const,
    payments: (reservationId: number) => ["payments", reservationId] as const,
    reservations: ["reservations"] as const,
    userReservations: ["reservations", "me"] as const,
    accommodationReservations: (accommodationId: number) => ["reservations", "accommodation", accommodationId] as const,
};