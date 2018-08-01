import React, { Component } from "react";
import { connect } from "react-redux";
import { getSlots, addSlot } from "../../../dux/reducer";
import moment from "moment";

class Day7Slots extends Component {
  constructor() {
    super();
    this.state = {
      event: "",
      hour: 0,
      minutes: 0,
      day: new Date().getDay()
    };
  }
  handleEvent() {
    let { event, hour, minutes, day } = this.state;
    let finalminutes = +hour * 60 + +minutes;
    //console.log(finalminutes);
    this.props.addSlot(event, finalminutes, day, moment().format("l"));
  }
  render() {
    let slots = this.props.slots.map((e, i) => (
      <div key={i}>
        Event : {e.event}
        Minutes : {e.minutes}
      </div>
    ));
    // let { event, hour, minutes, day } = this.state;
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
          <option>hr</option>
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
          <option>min</option>
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
        <button onClick={() => this.handleEvent()}>Add</button>
        {slots}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    slots: state.slots,
    weekdays: state.weekdays,
    today: state.today,
    user: state.user
  };
}

export default connect(
  mapStateToProps,
  { getSlots, addSlot }
)(Day7Slots);
