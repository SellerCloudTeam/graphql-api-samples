import React from "react";
import { Link, Route } from "react-router-dom";
import { Products } from "./Product";
import { ProductFragment } from "./ProductFragment";
import { ProductComplexType } from "./ProductComplexType";
import { Grid, Menu } from "semantic-ui-react";

export const ProductsNavigation = ({ match, location: { pathname } }) => (
  <>
    <Grid.Column width="four">
      <Menu secondary vertical>
        <Menu.Item active={pathname.includes("company")}>
          <Link to={`${match.url}/company`}>Filter by company</Link>
        </Menu.Item>
        <Menu.Item active={pathname.includes("fragment")}>
          <Link to={`${match.url}/fragment`}>Fragment</Link>
        </Menu.Item>
        <Menu.Item active={pathname.includes("complex")}>
          <Link to={`${match.url}/complexType`}>
            Complex type with variables
          </Link>
        </Menu.Item>
      </Menu>
    </Grid.Column>
    <Grid.Column width="twelve">
      <Route path={`${match.url}/company`} component={Products} />
      <Route path={`${match.url}/fragment`} component={ProductFragment} />
      <Route path={`${match.url}/complexType`} component={ProductComplexType} />
    </Grid.Column>
  </>
);
