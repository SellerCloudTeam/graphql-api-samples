import store from "store";

export const isLoggedIn = () => {
    const credentials = store.get("credentials");

    if (!credentials) {
        return false;
    }

    return credentials.isLoggedIn;
}