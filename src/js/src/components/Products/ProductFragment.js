import React from "react";
import { Query } from "react-apollo";

import { productFragmentQuery } from "./productsQuery";
import { renderGqlResponse } from "../GQLResponse";

export const ProductFragment = ({ userLoading, hasErrors, ...rest }) => {
  return <Query query={productFragmentQuery}>{renderGqlResponse}</Query>;
};
