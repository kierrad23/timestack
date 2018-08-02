import React, { Component } from "react";
import "./Dashboard.css";
import { Link, Switch, Route } from "react-router-dom";
import Overview from "../Overview/Overview";
import PreviousSlots from "../Days/slots";
import TodaySlots from "../Days/day7/day7slots";
import PreviousCharts from "../Days/charts";
import TodayCharts from "../Days/day7/day7charts";

import { connect } from "react-redux";
import { checkUser, getSlots } from "../../dux/reducer";
import moment from "moment";

class Dashboard extends Component {
  handleDate(d, format) {
    return moment()
      .subtract(d, "day")
      .format(format);
  }
  render() {
    return (
      <div className="dash">
        <nav className="logout">
          <button>
            <Link to="/"> Logout </Link>
          </button>
        </nav>
        <div className="day-parent">
          <div className="day">
            <button
              onClick={() =>
                this.props.getSlots(this.handleDate(1, "YYYY-MM-DD"))
              }
            >
              <Link to={`/dashboard/${this.handleDate(1, "YYYY-MM-DD")}`}>
                {this.handleDate(1, "dddd")}
              </Link>
            </button>
          </div>
          <div className="day">
            <button
              onClick={() =>
                this.props.getSlots(this.handleDate(2, "YYYY-MM-DD"))
              }
            >
              <Link to={`/dashboard/${this.handleDate(2, "YYYY-MM-DD")}`}>
                {this.handleDate(2, "dddd")}
              </Link>
            </button>
          </div>
          <div className="day">
            <button
              onClick={() =>
                this.props.getSlots(this.handleDate(3, "YYYY-MM-DD"))
              }
            >
              <Link to={`/dashboard/${this.handleDate(3, "YYYY-MM-DD")}`}>
                {this.handleDate(3, "dddd")}
              </Link>
            </button>
          </div>
          <div className="day">
            <button
              onClick={() =>
                this.props.getSlots(this.handleDate(4, "YYYY-MM-DD"))
              }
            >
              <Link to={`/dashboard/${this.handleDate(4, "YYYY-MM-DD")}`}>
                {this.handleDate(4, "dddd")}
              </Link>
            </button>
          </div>
          <div className="day">
            <button
              onClick={() =>
                this.props.getSlots(this.handleDate(5, "YYYY-MM-DD"))
              }
            >
              <Link to={`/dashboard/${this.handleDate(5, "YYYY-MM-DD")}`}>
                {this.handleDate(5, "dddd")}
              </Link>
            </button>
          </div>
          <div className="day">
            <button
              onClick={() =>
                this.props.getSlots(this.handleDate(6, "YYYY-MM-DD"))
              }
            >
              <Link to={`/dashboard/${this.handleDate(6, "YYYY-MM-DD")}`}>
                {this.handleDate(6, "dddd")}
              </Link>
            </button>
          </div>
        </div>
        <div className="bottom">
          <div className="screen">
            <Link to="/dashboard" className="viewlinks">
              Today
            </Link>
            {/* <Link to="/dashboard/weekview" className="viewlinks">
              Entire Week
            </Link> */}
            <Switch>
              <Route exact path="/dashboard" component={TodayCharts} />
              <Route path="/dashboard/:day" component={PreviousCharts} />
              <Route path="/dashboard/weekview" component={Overview} />
            </Switch>
          </div>
          <div className="slotholder">
            Slots
            <Switch>
              <Route exact path="/dashboard/" component={TodaySlots} />
              <Route exact path="/dashboard/:day" component={PreviousSlots} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ user: state.user });

// export default withRouter(
//   connect(
//     mapStateToProps,
//     { checkUser }
//   )(Dashboard)
// );
// export default Dashboard;
export default connect(
  mapStateToProps,
  { checkUser, getSlots }
)(Dashboard);
