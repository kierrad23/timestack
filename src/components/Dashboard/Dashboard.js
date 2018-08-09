import React, { Component } from "react";
import "./Dashboard.css";
import { Link, Switch, Route } from "react-router-dom";
import Overview from "../Overview/Overview";
import PreviousSlots from "../Days/slots";
import TodaySlots from "../Days/day7/day7slots";
import PreviousCharts from "../Days/charts";
import TodayCharts from "../Days/day7/day7charts";

import { connect } from "react-redux";
import { checkUser, getSlots, logout } from "../../dux/reducer";
import moment from "moment";
import jsPDF from "jspdf";
import { CSVLink } from "react-csv";
import { stack as Menu } from "react-burger-menu";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
  }
  handleDate(n, format) {
    return moment()
      .subtract(n, "day")
      .format(format);
  }
  formatForCSV(arr) {
    if (arr !== []) {
      let newarr = arr.map(e => ({
        event: e.event,
        minutes: e.minutes,
        date: e.date
      }));
      let copy = [];
      copy = newarr.map(e => Object.values(e));
      copy.unshift(["Event", "Minutes", "Date"]);
      return copy;
    }
  }

  createPDF() {
    let events = this.props.slots.map(e => e.event);
    let minutes = this.props.slots.map(e => "" + e.minutes);
    let date = this.props.slots.map(e => e.date);
    var doc = new jsPDF();
    doc.setTextColor(100);
    doc.text(["event"], 20, 20);
    doc.text(["minutes"], 100, 20);
    doc.text(["date"], 170, 20);
    doc.text(events, 20, 30);
    doc.text(minutes, 100, 30);
    doc.text(date, 170, 30);
    doc.save("filename.pdf");
  }

  render() {
    let csvData = this.formatForCSV(this.props.slots);
    return (
      <div className="dash">
        <Menu>
          <a>Home</a>
          <Link to="/random"> Notes</Link>
          <Link to="/random"> Goals</Link>
          <Link
            to="/"
            onClick={() => window.location.replace(process.env.REACT_LOGOUT)}
          >
            Logout
          </Link>
        </Menu>
        <nav className="logout" />
        <div className="week_cont">
          <div>
            <Link
              onClick={() =>
                this.props.getSlots(this.handleDate(1, "YYYY-MM-DD"))
              }
              to={`/dashboard/${this.handleDate(1, "YYYY-MM-DD")}`}
            >
              {this.handleDate(1, "dddd")}
            </Link>
          </div>
          <div>
            <Link
              onClick={() =>
                this.props.getSlots(this.handleDate(2, "YYYY-MM-DD"))
              }
              to={`/dashboard/${this.handleDate(2, "YYYY-MM-DD")}`}
            >
              {this.handleDate(2, "dddd")}
            </Link>
          </div>
          <div>
            <Link
              onClick={() =>
                this.props.getSlots(this.handleDate(3, "YYYY-MM-DD"))
              }
              to={`/dashboard/${this.handleDate(3, "YYYY-MM-DD")}`}
            >
              {this.handleDate(3, "dddd")}
            </Link>
          </div>
          <div>
            <Link
              onClick={() =>
                this.props.getSlots(this.handleDate(4, "YYYY-MM-DD"))
              }
              to={`/dashboard/${this.handleDate(4, "YYYY-MM-DD")}`}
            >
              {this.handleDate(4, "dddd")}
            </Link>
          </div>
          <div>
            <Link
              onClick={() =>
                this.props.getSlots(this.handleDate(5, "YYYY-MM-DD"))
              }
              to={`/dashboard/${this.handleDate(5, "YYYY-MM-DD")}`}
            >
              {this.handleDate(5, "dddd")}
            </Link>
          </div>
          <div>
            <Link
              onClick={() =>
                this.props.getSlots(this.handleDate(6, "YYYY-MM-DD"))
              }
              to={`/dashboard/${this.handleDate(6, "YYYY-MM-DD")}`}
            >
              {this.handleDate(6, "dddd")}
            </Link>
          </div>
        </div>
        <div className="slot_chart_cont">
          <div className="chart_cont">
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
          <div className="slot_cont">
            {this.props.slots !== [] && (
              <a className="but_pdf" onClick={() => this.createPDF()}>
                Download to PDF
              </a>
            )}
            <CSVLink data={csvData} filename={"tables.csv"}>
              Download to CSV
            </CSVLink>
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

const mapStateToProps = state => ({ user: state.user, slots: state.slots });

export default connect(
  mapStateToProps,
  { checkUser, getSlots, logout }
)(Dashboard);
