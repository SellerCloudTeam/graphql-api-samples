import React from "react";
import { Query } from "react-apollo";

import { fragmentQuery } from "./fragmentQuery";
import { renderGqlResponse } from "../GQLResponse";

export const OrderFragment = ({ userLoading, hasErrors, ...rest }) => {
  return (
    <Query query={fragmentQuery}>
      {renderGqlResponse}
    </Query>
  );
};
