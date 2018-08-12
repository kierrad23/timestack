import React, { Component } from "react";
import {
  getLimits,
  addLimit,
  deleteLimit,
  getAllSlots
} from "../../dux/reducer";
import { connect } from "react-redux";
import moment from "moment";

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
  render() {
    let goals = this.props.goals.map(e => (
      <div key={e.id}>
        <p>{`${e.event} ${e.elimit}`}</p>
        <button onClick={() => this.props.deleteLimit(e.id)}>Delete</button>
      </div>
    ));
    return (
      <div>
        <select onChange={e => this.setState({ event: e.target.value })}>
          <option>Select an Event</option>
          <option>Eat</option>
          <option>Sleep</option>
          <option>Work</option>
          <option>School</option>
          <option>Fitness</option>
          <option>Transporting</option>
        </select>
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
        <select onChange={e => this.setState({ minutes: e.target.value })}>
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
        <button onClick={() => this.handleNewLimit()}>Add</button>
        {goals}
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
