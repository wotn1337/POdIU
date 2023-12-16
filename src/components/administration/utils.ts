import { StateType } from "app/features/administration/types";

export const getFlatPermissions = (permissions: StateType["permissions"]) => {
  if (permissions) {
    return Object.entries(permissions).reduce((result, current) => {
      const [key, items] = current;

      return [
        ...result,
        ...items.map((item) => ({
          id: item.id,
          title: `${key} - ${item.title}`,
        })),
      ];
    }, [] as { id: number; title: string }[]);
  }

  return [];
};
