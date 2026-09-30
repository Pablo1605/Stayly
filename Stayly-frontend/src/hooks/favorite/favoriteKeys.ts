export const favoriteKeys = {
  all: ["favorites"] as const,
  list: () => [...favoriteKeys.all] as const,
};
