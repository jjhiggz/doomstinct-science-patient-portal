import { useSession } from "vinxi/http";
import { ClientUser } from "./routes/(auth)/-helpers/auth-schemas";
import { VITE_ENV } from "~/env";

type ClientSession = {
  user: ClientUser;
  token: string;
};

export function useAuthSession() {
  const session = useSession<ClientSession>({
    password: VITE_ENV.VITE_JWT_SECRET,
  });
  return session;
}
