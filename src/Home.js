import React, { Component } from "react";
import "./Home.css";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div className="main">
        <button className="dash-but">
          <Link to="/dashboard"> Go to Dashboard</Link>
        </button>
        <div className="welcome">
          <h3> Time Stack</h3>
        </div>
      </div>
    );
  }
}

export default Home;
