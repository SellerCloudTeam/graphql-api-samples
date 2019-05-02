import React from "react";
import { Link, Route } from "react-router-dom";
import { GlobalSearchSimple } from "./GlobalSearchSimple";
import { GlobalSearchFragments } from "./GlobalSearchFragments";
import { Grid, Menu } from "semantic-ui-react";

export const GlobalSearchNavigation = ({ match, location: { pathname } }) => (
  <>
    <Grid.Column width="four">
      <Menu secondary vertical>
        <Menu.Item active={pathname.includes("simple")}>
          <Link to={`${match.url}/simple`}>Simple</Link>
        </Menu.Item>
        <Menu.Item active={pathname.includes("fragment")}>
          <Link to={`${match.url}/fragment`}>Fragment</Link>
        </Menu.Item>
      </Menu>
    </Grid.Column>
    <div className="twelve wide column">
      <Route path={`${match.url}/simple`} component={GlobalSearchSimple} />
      <Route path={`${match.url}/fragment`} component={GlobalSearchFragments} />
    </div>
  </>
);
