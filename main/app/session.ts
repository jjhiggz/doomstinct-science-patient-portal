import { useSession } from "vinxi/http";
import { ClientUser } from "./routes/(auth)/-helpers/auth-schemas";
// import { VITE_ENV } from "~/env";
// import { randomUUID } from "crypto";

type ClientSession = {
  user: ClientUser;
  token: string;
};

// const uuid = randomUUID();

export function useAuthSession() {
  const session = useSession<ClientSession>({
    password: "here-is-a-thinhere-is-a-thinhere-is-a-thinggghere-is-a-thing",
  });
  return session;
}
