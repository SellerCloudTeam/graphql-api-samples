import React, { useMemo } from "react";
import { Route, Redirect } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import { isLoggedIn } from "../auth/isLoggedIn";
import { getTokenFromStore } from "../auth/getTokenFromStore";

import { ViewerNavigation } from "./Viewer";
import { FragmentNavigation } from "./Fragment";
import { OrdersNavigation } from "./Orders";
import { ProductsNavigation } from "./Products";
import { PaymentNavigation } from "./Payments";
import { GlobalSearchNavigation } from "./GlobalSearch";
import { GraphiQLContainer } from "./GraphiQL";

import { GRAPHQL_SERVER, GRAPHQL_ENDPOINT } from "../config";

export const Site = () => {
  const { token, type } = getTokenFromStore();
  const client = useMemo(() =>
    new ApolloClient({
      uri: `${GRAPHQL_SERVER}${GRAPHQL_ENDPOINT}`,
      headers: { Authorization: `${type} ${token}` }
    }), [type, token]
  );

  if (!isLoggedIn()) {
    return <Redirect to="/login" />;
  }

  return (
    <ApolloProvider client={client}>
      <div className="ui two column very relaxed grid">
        <Route path="/viewer" component={ViewerNavigation} />
        <Route path="/fragment" component={FragmentNavigation} />
        <Route path="/orders" component={OrdersNavigation} />
        <Route path="/products" component={ProductsNavigation} />
        <Route path="/payments" component={PaymentNavigation} />
        <Route path="/globalSearch" component={GlobalSearchNavigation} />
        <Route path="/graphiql" component={GraphiQLContainer} />
      </div>
    </ApolloProvider>
  );
};
