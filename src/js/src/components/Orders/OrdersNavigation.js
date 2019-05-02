import React from "react";
import { Link, Route } from "react-router-dom";
import { SingleOrder } from "./SingleOrder";
import { MultipleOrder } from "./MultipleOrders";
import { Grid, Menu } from "semantic-ui-react";

export const OrdersNavigation = ({ match, location }) => (
  <>
    <Grid.Column width="four">
      <Menu secondary vertical>
        <Menu.Item  active={location.pathname.includes("single")}>
          <Link to={`${match.url}/single`}>Single Order</Link>
        </Menu.Item>
        <Menu.Item  active={location.pathname.includes("multiple")}>
          <Link to={`${match.url}/multiple`}>Multiple Orders</Link>
        </Menu.Item>
      </Menu>
    </Grid.Column>
    <Grid.Column width="twelve">
      <Route path={`${match.url}/single`} component={SingleOrder} />
      <Route path={`${match.url}/multiple`} component={MultipleOrder} />
    </Grid.Column>
  </>
);
