import React, { Component } from "react";
import {
  getLimits,
  addLimit,
  deleteLimit,
  getAllSlots
} from "../../dux/reducer";
import { connect } from "react-redux";
import moment from "moment";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import { Link } from "react-router-dom";
import { stack as Menu } from "react-burger-menu";
import "./Goals.css";

class Goals extends Component {
  constructor() {
    super();
    this.state = {
      event: "",
      hour: 0,
      minutes: 0
    };
  }

  componentDidMount() {
    this.props.getLimits();
    let end = moment().format("YYYY-MM-DD");
    let start = moment()
      .subtract(6, "day")
      .format("YYYY-MM-DD");
    this.props.getAllSlots(start, end);
  }

  handleNewLimit() {
    const { event, hour, minutes } = this.state;
    let finalminutes = +hour * 60 + +minutes;
    this.props.addLimit(event, finalminutes);
  }

  handleCondense() {
    let eventarr = this.props.goals.map(e => e.event);
    let objarr = this.props.goals.map(e => ({ [e.event]: e.elimit }));
    let goalform = Object.assign({}, ...objarr);
    let comparray = [];
    this.props.slots.map(e => {
      if (eventarr.includes(e.event)) {
        comparray.push({
          event: e.event,
          current: e.minutes,
          limit: goalform[e.event]
        });
      }
    });
    let condensed = Object.values(
      comparray.reduce((res, e) => {
        // console.log(e, res);
        !res[e.event]
          ? (res[e.event] = {
              event: e.event,
              current: e.current,
              limit: e.limit
            })
          : (res[e.event]["current"] += e.current);
        return res;
      }, {})
    );
    return condensed;
  }

  handleOverDiff(arr) {
    let overarray = [];
    arr.forEach(
      e =>
        e.current > e.limit &&
        overarray.push(
          `You went over your ${e.event} limit by ${amount(
            e.current - e.limit
          )} \n`
        )
    );
    return overarray.join("");
  }
  handleTwoHrDiff(arr) {
    let overarray = [];
    arr.forEach(
      e =>
        e.limit - e.current <= 120 &&
        e.limit - e.current > 0 &&
        overarray.push(
          `You are ${amount(e.limit - e.current)} away from your ${
            e.event
          } limit \n`
        )
    );
    return overarray.join("");
  }
  handleFourHrDiff(arr) {
    let overarray = [];
    arr.forEach(
      e =>
        e.limit - e.current > 120 &&
        e.limit - e.current <= 240 &&
        overarray.push(
          `You are ${amount(e.limit - e.current)} away from your ${
            e.event
          } limit \n`
        )
    );
    return overarray.join("");
  }
  handleNotifs() {
    NotificationManager.info(
      this.handleOverDiff(this.handleCondense()),
      "Over",
      100000
    );
    NotificationManager.warning(
      this.handleTwoHrDiff(this.handleCondense()),
      "Warning",
      100000
    );
    NotificationManager.error(
      this.handleFourHrDiff(this.handleCondense()),
      "Close",
      100000
    );
  }

  render() {
    let goals = this.props.goals.map(e => (
      <div className="each_goal" key={e.id}>
        <p>{`${e.event} ${amount(e.elimit)}`}</p>
        <button
          className="delete_goal"
          onClick={() => this.props.deleteLimit(e.id)}
        >
          Delete
        </button>
      </div>
    ));
    return (
      <div className="goal_main">
        <Menu>
          <Link to="/"> Home</Link>
          <Link to="/dashboard"> Dashboard</Link>
          <Link to="/notes"> Notes</Link>
          <Link
            to="/"
            onClick={() =>
              (window.location.href = process.env.REACT_APP_LOGOUT)
            }
          >
            Logout
          </Link>
        </Menu>
        <h1 className="goals_head">Goals </h1>
        <div className="below_menu">
          <button className="show_but" onClick={() => this.handleNotifs()}>
            Show Status
          </button>
          <NotificationContainer />
          <div className="add_goal_cont">
            <div className="styled">
              <select onChange={e => this.setState({ event: e.target.value })}>
                <option>Select an Event</option>
                <option>Eat</option>
                <option>Sleep</option>
                <option>Work</option>
                <option>School</option>
                <option>Fitness</option>
                <option>Transportation</option>
              </select>
            </div>
            <div className="styled">
              <select onChange={e => this.setState({ hour: e.target.value })}>
                <option disabled selected hidden>
                  hr
                </option>
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
              </select>
            </div>
            <div className="styled">
              <select
                onChange={e =>
                  this.setState({
                    minutes: e.target.value
                  })
                }
              >
                <option disabled selected hidden>
                  min
                </option>
                <option>0</option>
                <option>5</option>
                <option>10</option>
                <option>15</option>
                <option>20</option>
                <option>25</option>
                <option>30</option>
                <option>35</option>
                <option>40</option>
                <option>45</option>
                <option>50</option>
                <option>55</option>
              </select>
            </div>
            <button className="add_goal" onClick={() => this.handleNewLimit()}>
              Add
            </button>
          </div>
          <div className="all_goals">{goals}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  goals: state.limits,
  slots: state.allslots
});

export default connect(
  mapStateToProps,
  { getLimits, addLimit, deleteLimit, getAllSlots }
)(Goals);

function amount(min) {
  let hour = h => (h === 1 ? "1 hour" : `${h} hours`);
  console.log(moment.duration(min, "minutes")._data.minutes);
  return min < 60
    ? `${moment.duration(min, "minutes")._data.minutes} minutes`
    : min % 60 === 0
      ? hour(moment.duration(min, "minutes")._data.hours)
      : `${hour(moment.duration(min, "minutes")._data.hours)} ${
          moment.duration(min, "minutes")._data.minutes
        } minutes`;
}
