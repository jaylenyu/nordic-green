import { CustomUser } from "types/type";

export const getCustomUser = (session: any): CustomUser | undefined => {
  return session?.user as CustomUser | undefined;
};
