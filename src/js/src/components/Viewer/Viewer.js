import React from "react";
import { Query } from "react-apollo";

import { viewerQuery } from "./viewerQuery";
import { renderGqlResponse } from "../GQLResponse";

export const Viewer = ({ userLoading, hasErrors, ...rest }) => {
  return <Query query={viewerQuery}>{renderGqlResponse}</Query>;
};
