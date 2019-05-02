import { requestToken } from "../apis/tokens";
import memoize from "lodash.memoize";

const memoizedFetch = memoize(
  async userType => {
    const response = requestToken(userType);
    return response;
  },
  ({ Username, Password }) => `${Username}${Password}`
);

export const getToken = userType => {
  const response = memoizedFetch(userType);

  if (response && response.success) {
    const {
      data: { access_token: token, token_type: type }
    } = response;

    return { token, type, success: true };
  }

  return response;
};
