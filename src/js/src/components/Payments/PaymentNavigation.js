import React from "react";
import { Link, Route } from "react-router-dom";
import { Payment } from "./Payment";
import { Grid, Menu } from "semantic-ui-react";

export const PaymentNavigation = ({ match, location }) => (
  <>
    <Grid.Column width="four">
      <Menu secondary vertical>
        <Menu.Item active={location.pathname.includes("order")}>
          <Link to={`${match.url}/order`}>Filter by Order</Link>
        </Menu.Item>
      </Menu>
    </Grid.Column>
    <Grid.Column width="twelve">
      <Route path={`${match.url}/order`} component={Payment} />
    </Grid.Column>
  </>
);
