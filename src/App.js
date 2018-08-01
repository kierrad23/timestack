import React, { Component } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { routes } from "./routes";

class Home extends Component {
  render() {
    return <div>{routes}</div>;
  }
}

// const mapStateToProps = state => {
//   return {
//     user: state.user
//   };
// };

// export default connect(
//   mapStateToProps,
//   { getUser }
// )(Home);
export default Home;
