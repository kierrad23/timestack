import React, { Component } from "react";
import "./Dashboard.css";
import { Link, Switch, Route } from "react-router-dom";
import Overview from "../Overview/Overview";
import PreviousSlots from "../Days/slots";
import TodaySlots from "../Days/day7/day7slots";
import PreviousCharts from "../Days/charts";
import TodayCharts from "../Days/day7/day7charts";

import { connect } from "react-redux";
import { getSlots, logout } from "../../dux/reducer";
import moment from "moment";
import jsPDF from "jspdf";
import { CSVLink } from "react-csv";
import { stack as Menu } from "react-burger-menu";
import Modal from "react-responsive-modal";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      modalOpenStatus: false
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

  createPDF(type) {
    let { pathname } = this.props.location;
    let events =
      pathname === "/dashboard/weekview"
        ? this.props.allslots.map(e => e.event)
        : this.props.slots.map(e => e.event);
    let minutes =
      pathname === "/dashboard/weekview"
        ? this.props.allslots.map(e => "" + e.minutes)
        : this.props.slots.map(e => "" + e.minutes);
    let date =
      pathname === "/dashboard/weekview"
        ? this.props.allslots.map(e => e.date)
        : this.props.slots.map(e => e.date);
    var doc = new jsPDF();
    doc.setTextColor(100);
    doc.text(["event"], 20, 20);
    doc.text(["minutes"], 100, 20);
    doc.text(["date"], 170, 20);
    doc.text(events, 20, 30);
    doc.text(minutes, 100, 30);
    doc.text(date, 170, 30);
    pathname === "/dashboard/weekview"
      ? doc.save(`weeklyslots.pdf`)
      : doc.save(`${date.find(e => e)}slots.pdf`);
  }
  handleExportType() {
    return this.props.location.pathname === "/dashboard/weekview"
      ? this.props.allslots
      : this.props.slots;
  }

  handleModal() {
    this.setState({ modalOpenStatus: !this.state.modalOpenStatus });
  }

  render() {
    let csvData = this.formatForCSV(this.handleExportType());
    return (
      <div className="dash">
        <Menu>
          <Link to="/"> Home</Link>
          <Link to="/notes"> Notes</Link>
          <Link to="/limits"> Goals</Link>
          <Link
            to="/"
            onClick={() =>
              (window.location.href = process.env.REACT_APP_LOGOUT)
            }
          >
            Logout
          </Link>
        </Menu>
        <button className="export" onClick={() => this.handleModal()}>
          Export
        </button>
        <Modal
          open={this.state.modalOpenStatus}
          onClose={() => this.handleModal()}
          classNames={{
            transitionEnter: "transition-enter",
            transitionEnterActive: "transition-enter-active",
            transitionExit: "transition-exit-active",
            transitionExitActive: "transition-exit-active"
          }}
          animationDuration={800}
        >
          <p>Export</p>
          {this.props.slots !== [] && (
            <a className="but_pdf" onClick={() => this.createPDF()}>
              Download to PDF
            </a>
          )}
          <CSVLink
            data={csvData}
            filename={
              this.props.location.pathname === "/dashboard/weekview"
                ? "weekly.csv"
                : `${this.props.slots.map(e => e.date).find(e => e)}`
            }
          >
            Download to CSV
          </CSVLink>
        </Modal>
        <nav className="logout" />
        <div className="week_cont">
          <div>
            <Link
              className="day_link"
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
              className="day_link"
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
              className="day_link"
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
              className="day_link"
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
              className="day_link"
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
              className="day_link"
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
            <Link to="/dashboard/weekview" className="viewlinks">
              Entire Week
            </Link>
            <Switch>
              <Route exact path="/dashboard/weekview" component={Overview} />
              <Route exact path="/dashboard" component={TodayCharts} />
              <Route exact path="/dashboard/:day" component={PreviousCharts} />
            </Switch>
          </div>
          <div className="slot_cont">
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
// const handleState = ()=>;

const mapStateToProps = state => ({
  user: state.user,
  slots: state.slots,
  allslots: state.allslots
});

export default connect(
  mapStateToProps,
  { getSlots, logout }
)(Dashboard);
