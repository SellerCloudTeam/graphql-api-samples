import React from "react";
import GraphiQL from "graphiql";
import fetch from "isomorphic-fetch";

import "../../../node_modules/graphiql/graphiql.css";
import { GRAPHQL_SERVER, GRAPHQL_ENDPOINT } from "../../config";
import { getTokenFromStore } from "../../auth/getTokenFromStore";

export const GraphiQLContainer = () => {
  const { token, type } = getTokenFromStore();

  const context = { Authorization: `${type} ${token}`};
  const graphQLFetcher = graphQLParams => {
    return fetch(`${GRAPHQL_SERVER}${GRAPHQL_ENDPOINT}`, {
      method: "post",
      headers: { "Content-Type": "application/json", ...context },
      body: JSON.stringify(graphQLParams)
    }).then(response => response.json());
  };

  return <GraphiQL fetcher={graphQLFetcher} />;
};
