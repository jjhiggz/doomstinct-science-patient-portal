import { useRouteContext } from "@tanstack/react-router";

export const useMaybeUser = () => {
  const { user } = useRouteContext({ from: "__root__" });
  return user;
};

export const useUser = () => {
  const user = useMaybeUser();
  if (!user) throw new Error("User not found");

  return user;
};
