import React from "react";
import { Link, Route } from "react-router-dom";
import { OrderFragment } from "./OrderFragment";
import { Grid, Menu } from "semantic-ui-react";

export const FragmentNavigation = ({ match, location }) => {
  const orderPath = `${match.url}/order`;
  return (
    <>
      <Grid.Column width={4}>
        <Menu secondary vertical>
          <Menu.Item active={location.pathname === orderPath}>
            <Link to={orderPath}>Order</Link>
          </Menu.Item>
        </Menu>
      </Grid.Column>
      <Grid.Column width={12}>
        <Route path={orderPath} component={OrderFragment} />
      </Grid.Column>
    </>
  );
};
