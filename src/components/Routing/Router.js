import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { checkUser } from "../../dux/reducer";

class Router extends Component {
  // componentDidMount() {
  //   this.props.checkUser().then(() => {
  //     if (!this.props.user.authid) {
  //       window.location.replace("http://localhost:3001/login");
  //     }
  //   });
  // }
  render() {
    let { user, path, component } = this.props;
    return !user === "" ? <div /> : <Route path={path} component={component} />;
  }
}

const mapStateToProps = state => {
  return {
    user: state.slots.user
  };
};

export default connect(
  mapStateToProps,
  { checkUser }
)(Router);
