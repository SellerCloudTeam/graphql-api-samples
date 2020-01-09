import store from "store";
import jwt from "jsonwebtoken";

export const isLoggedIn = () => {
  const credentials = store.get("credentials");

  if (!credentials) {
    return false;
  }

  const checkToken = jwt.decode(credentials.token);

  if (checkToken === null || Date.now() >= checkToken.exp * 1000) {
    store.remove("credentials");
    return false;
  }

  return credentials.isLoggedIn;
};
