import store from "store";

export const getTokenFromStore = () => {
    const credentials = store.get("credentials");

    if (!credentials) {
        return { error: "Not authorised"};
    }

    const { token, type } = credentials;

    return { token, type };
}