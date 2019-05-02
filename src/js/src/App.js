import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Container } from "semantic-ui-react";

import { Header } from "./components/Header";
import { Site } from "./components/Site";
import { Login } from "./components/Login";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Container>
        <BrowserRouter basename="/gql/ui">
          <div>
            <Header />
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/" component={Site} />
            </Switch>
          </div>
        </BrowserRouter>
      </Container>
    );
  }
}

export default App;
