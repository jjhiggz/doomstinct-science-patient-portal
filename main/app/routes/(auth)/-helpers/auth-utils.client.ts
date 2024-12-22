import { pipe } from "remeda";
import { clientUserSchema } from "./auth-schemas";
import { jwtDecode } from "jwt-decode";

const tokenKey = "token";

export const getJWTFromLocalStorage = () => {
  const raw = localStorage.getItem(tokenKey);
  return raw;
};

export const setJWTInLocalStorage = (jwtRaw: string) => {
  return localStorage.setItem(tokenKey, jwtRaw);
};

export const getDataFromJWT = (rawToken: string) => {
  return pipe(jwtDecode(rawToken), clientUserSchema.parse);
};
