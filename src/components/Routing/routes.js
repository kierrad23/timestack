import React, { Component } from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import Home from "./Home";
import Page404 from "./components/Page404/Page404";
import Login from "./components/Login";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class Router extends Component {
  render() {
    let = {user , path,component} = this.props
    return 
    user ? <Route path={path} component={component}/> : window.location.replace(process.env.REACT_LOGIN)
  }
}

// export const routes = (
//   <Switch>
//     <Route exact path="/" component={Home} />
//     {/* {axios.get("/api/checkuser").then(res => console.log(res))} */}

//     <Route path="/dashboard" component={Dashboard} />
//     {/* <Home /> */}
//     {/* <Route path="/login" render={() => axios.get("/login")} /> */}
//     <Route path="*" component={Page404} />
//   </Switch>
// );
const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Router);
