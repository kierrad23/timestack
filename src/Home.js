import React, { Component } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import WOW from "wow.js";

class Home extends Component {
  componentDidMount() {
    new WOW().init();
  }
  render() {
    return (
      <div className="main">
        <nav className="nav shadow">
          <h2 className="logo"> Time Stack </h2>

          <Link className="dash-but" to="/dashboard">
            Go to Dashboard
          </Link>

          <button
            className="login-but"
            onClick={() => (window.location.href = process.env.REACT_APP_LOGIN)}
          >
            Login
          </button>
        </nav>

        <div className="welcome wow zoomIn" data-wow-duration="4s">
          <h3 className="step_up"> Step Up Your Productivity</h3>
          <p>
            Introducing a new way to view where all your time is going. With
            features for taking notes , setting goals , and many more to come,
            TimeStack is your essential tool to better manage your time.
          </p>
          <button
            className="get_started"
            onClick={() => (window.location.href = process.env.REACT_APP_LOGIN)}
          >
            &#8594;
          </button>
        </div>
      </div>
    );
  }
}

export default Home;
