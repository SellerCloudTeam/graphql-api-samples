import React from "react";
import { Query } from "react-apollo";

import { productComplexTypeQuery } from "./productsQuery";
import { renderGqlResponse } from "../GQLResponse";

const variables = {
    paging: { page: 2, count: 7 },
    sort: { by: "id", desc: true },
    filters: { companyIds: [162, 163]}
};

export const ProductComplexType = ({ userLoading, hasErrors, ...rest }) => {
  return (
    <Query query={productComplexTypeQuery} variables={variables}>
      {renderGqlResponse}
    </Query>
  );
};