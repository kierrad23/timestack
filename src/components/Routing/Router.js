import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { checkUser } from "../../dux/reducer";

class Router extends Component {
  componentDidMount() {
    this.props.checkUser().then(() => {
      if (!this.props.user.authid) {
        // window.location.href = process.env.REACT_APP_LOGIN;
        console.log("here");
      }
    });
  }
  render() {
    let { user, path, component } = this.props;
    return user === "" ? <div /> : <Route path={path} component={component} />;
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { checkUser }
)(Router);
