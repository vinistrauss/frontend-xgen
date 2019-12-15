import React from "react";

import { Switch, Route } from "react-router-dom";

import Main from "./pages/main";
import Client from "./pages/client";

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Main}></Route>
    <Route path="/clients/:id" component={Client}></Route>
  </Switch>
);

export default Routes;
