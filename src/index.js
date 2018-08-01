import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./reset.css";
import { HashRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./dux/store";
import Dashboard from "./components/Dashboard/Dashboard";
import Home from "./Home";
import Page404 from "./components/Page404/Page404";
import Router from "./components/Routing/Router";

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Router path="/dashboard" component={Dashboard} />
        <Route path="*" component={Page404} />
      </Switch>
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
