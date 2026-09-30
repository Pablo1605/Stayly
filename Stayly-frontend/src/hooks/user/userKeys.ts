export const userKeys = {
    all: ["users"] as const,
    lists: () =>
        [...userKeys.all, "list"] as const,
    list: () =>
        [...userKeys.lists()] as const,
    detail: (userId: number) =>
        [...userKeys.all, "detail", userId] as const,
    current: () =>
        [...userKeys.all, "current"] as const,
};    