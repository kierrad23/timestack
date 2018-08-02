import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getSlots,
  addSlot,
  deleteSlot,
  updateSlot
} from "../../../dux/reducer";
import moment from "moment";

class Day7Slots extends Component {
  constructor() {
    super();
    this.state = {
      event: "",
      hour: 0,
      minutes: 0,
      day: new Date().getDay(),
      editFlag: false,
      editId: null
    };
  }
  componentDidMount() {
    const date = moment().format("YYYY-MM-DD");

    this.props.getSlots(date);
  }
  handleEvent() {
    let { event, hour, minutes, day } = this.state;
    let finalminutes = +hour * 60 + +minutes;
    this.props.addSlot(event, finalminutes, day, moment().format("YYYY-MM-DD"));
  }

  handleDelete(id) {
    const date = moment().format("YYYY-MM-DD");

    this.props.deleteSlot(id).then(() => {
      this.props.getSlots(date);
    });
  }
  handleFlag(id) {
    this.setState({ editFlag: true, editId: id });
  }
  handleUpdate(id, minutes) {
    const date = moment().format("YYYY-MM-DD");

    this.props.updateSlot(id, minutes).then(() => {
      this.props.getSlots(date);
      this.setState({ editFlag: false });
    });
  }
  handleMinuteInput(minutes) {
    this.setState({ minutes });
  }
  render() {
    let slots = this.props.slots.map((e, i) => (
      <div key={i}>
        <span onDoubleClick={() => this.handleFlag(e.id)}>
          Minutes :{" "}
          {!this.state.editFlag ? (
            e.minutes
          ) : this.state.editFlag && this.state.editId === e.id ? (
            <span>
              <input onChange={e => this.handleMinuteInput(e.target.value)} />
              <button
                onClick={() => this.handleUpdate(e.id, this.state.minutes)}
              >
                update
              </button>
            </span>
          ) : (
            e.minutes
          )}
        </span>
        <span> Event : {e.event}</span>
        <button onClick={() => this.handleDelete(e.id)}>Delete</button>
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
  { getSlots, addSlot, deleteSlot, updateSlot }
)(Day7Slots);
