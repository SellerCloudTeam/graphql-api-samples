import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu, Button, Label } from "semantic-ui-react";
import store from "store";

import { isLoggedIn } from "../auth/isLoggedIn";

const menuItemPaths = {
  viewer: "/viewer",
  fragment: "/fragment",
  orders: "/orders",
  payments: "/payments",
  products: "/products",
  globalSearch: "/globalSearch",
  graphiql: "/graphiql"
};

const LoginButtons = withRouter(({ history }) => {
  const handleLogout = () => {
    store.remove("credentials");
    history.push("/login");
  };

  if (!isLoggedIn()) {
    return (
      <Menu.Item position="right">
        <Link to="/login">Log in</Link>
      </Menu.Item>
    );
  }

  return (
    <>
      <Menu.Item position="right">
        <Label as="a" content={store.get("credentials").Username} icon="address card outline" />
        <Button type="button" onClick={handleLogout} basic>
          Log out
        </Button>
      </Menu.Item>
    </>
  );
});

export const Header = withRouter(({ location: { pathname } }) => (
  <Menu secondary pointing>
    <Menu.Item active={pathname.includes(menuItemPaths.viewer)}>
      <Link to={menuItemPaths.viewer}>Viewer</Link>
    </Menu.Item>
    <Menu.Item active={pathname.includes(menuItemPaths.fragment)}>
      <Link to={menuItemPaths.fragment}>Fragment</Link>
    </Menu.Item>
    <Menu.Item active={pathname.includes(menuItemPaths.orders)}>
      <Link to={menuItemPaths.orders}>Orders</Link>
    </Menu.Item>
    <Menu.Item active={pathname.includes(menuItemPaths.payments)}>
      <Link to={menuItemPaths.payments}>Payments</Link>
    </Menu.Item>
    <Menu.Item active={pathname.includes(menuItemPaths.products)}>
      <Link to={menuItemPaths.products}>Products</Link>
    </Menu.Item>
    <Menu.Item active={pathname.includes(menuItemPaths.globalSearch)}>
      <Link to={menuItemPaths.globalSearch}>Global Search</Link>
    </Menu.Item>
    <Menu.Item active={pathname.includes(menuItemPaths.graphiql)}>
      <Link to={menuItemPaths.graphiql}>GraphiQL Browser</Link>
    </Menu.Item>

    <LoginButtons />
  </Menu>
));
