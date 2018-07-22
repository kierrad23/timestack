import React, { Component } from "react";
import "./Home.css";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div>
        <h3>Home Page</h3>
        <button>
          <Link to="/dashboard"> Go to Dashboard</Link>
        </button>
      </div>
    );
  }
}

export default Home;
