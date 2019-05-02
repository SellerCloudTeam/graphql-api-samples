import axios from "axios";

import { GRAPHQL_SERVER, TOKEN_ENDPOINT } from "../config";

const ax = axios.create({
  baseURL: GRAPHQL_SERVER
});

export const requestToken = async userType => {
  try {
    const response = await ax.post(TOKEN_ENDPOINT, userType);
    return { success: true, data: response.data }
  } catch (err) {
    return { success: false, message: err.message };
  }
};
