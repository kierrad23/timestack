import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { HashRouter, Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Home from "./Home";
import Page404 from "./components/Page404/Page404";
ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="*" component={Page404} />
    </Switch>
  </HashRouter>,
  document.getElementById("root")
);
