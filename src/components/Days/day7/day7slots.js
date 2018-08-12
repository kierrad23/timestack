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
      addhour: 0,
      optionhour: 0,
      updatehour: 0,
      addminutes: 0,
      optionminutes: 0,
      updateminutes: 0,
      day: new Date().getDay(),
      editFlag: false,
      editId: null
    };
  }
  componentDidMount() {
    const date = moment().format("YYYY-MM-DD");

    this.props.getSlots(date);
  }
  handleEventAdd() {
    let { event, addhour, addminutes } = this.state;
    let finalminutes = +addhour * 60 + +addminutes;
    this.props.addSlot(event, finalminutes, moment().format("YYYY-MM-DD"));
  }

  handleDelete(id) {
    const date = moment().format("YYYY-MM-DD");
    this.props.deleteSlot(id, date);
  }
  handleFlag(id, mins) {
    let hours = moment.duration(mins, "minutes")._data.hours;
    let minutes = moment.duration(mins, "minutes")._data.minutes;
    this.setState({
      editFlag: true,
      editId: id,
      optionhour: hours,
      optionminutes: minutes,
      updatehour: hours,
      updateminutes: minutes
    });
  }
  handleUpdate(id) {
    const date = moment().format("YYYY-MM-DD");
    let { updatehour, updateminutes } = this.state;
    let totalmins = +updatehour * 60 + +updateminutes;
    this.props.updateSlot(id, totalmins, date).then(() => {
      this.setState({ editFlag: false });
    });
  }
  render() {
    let slots = this.props.slots.map((e, i) => (
      <div key={i}>
        <span onDoubleClick={() => this.handleFlag(e.id, e.minutes)}>
          Minutes :
          {!this.state.editFlag ? (
            ` ${hour(e.minutes)} ${minute(e.minutes)}`
          ) : this.state.editFlag && this.state.editId === e.id ? (
            <span>
              <select
                onChange={e => this.setState({ updatehour: e.target.value })}
              >
                <option>hr</option>
                {this.state.optionhour === 0 ? (
                  <option selected>0</option>
                ) : (
                  <option>0</option>
                )}
                {this.state.optionhour === 1 ? (
                  <option selected>1</option>
                ) : (
                  <option>1</option>
                )}
                {this.state.optionhour === 2 ? (
                  <option selected>2</option>
                ) : (
                  <option>2</option>
                )}
                {this.state.optionhour === 3 ? (
                  <option selected>3</option>
                ) : (
                  <option>3</option>
                )}
                {this.state.optionhour === 4 ? (
                  <option selected>4</option>
                ) : (
                  <option>4</option>
                )}
                {this.state.optionhour === 5 ? (
                  <option selected>5</option>
                ) : (
                  <option>5</option>
                )}
                {this.state.optionhour === 6 ? (
                  <option selected>6</option>
                ) : (
                  <option>6</option>
                )}
                {this.state.optionhour === 7 ? (
                  <option selected>7</option>
                ) : (
                  <option>7</option>
                )}
                {this.state.optionhour === 8 ? (
                  <option selected>8</option>
                ) : (
                  <option>8</option>
                )}
                {this.state.optionhour === 9 ? (
                  <option selected>9</option>
                ) : (
                  <option>9</option>
                )}
                {this.state.optionhour === 10 ? (
                  <option selected>10</option>
                ) : (
                  <option>10</option>
                )}
                {this.state.optionhour === 11 ? (
                  <option selected>11</option>
                ) : (
                  <option>11</option>
                )}
                {this.state.optionhour === 12 ? (
                  <option selected>12</option>
                ) : (
                  <option>12</option>
                )}
              </select>
              <select
                onChange={e => this.setState({ updateminutes: e.target.value })}
              >
                {this.state.optionminutes === 0 ? (
                  <option selected>0</option>
                ) : (
                  <option>0</option>
                )}
                {this.state.optionminutes === 5 ? (
                  <option selected>5</option>
                ) : (
                  <option>5</option>
                )}
                {this.state.optionminutes === 10 ? (
                  <option selected>10</option>
                ) : (
                  <option>10</option>
                )}
                {this.state.optionminutes === 15 ? (
                  <option selected>15</option>
                ) : (
                  <option>15</option>
                )}
                {this.state.optionminutes === 20 ? (
                  <option selected>20</option>
                ) : (
                  <option>20</option>
                )}
                {this.state.optionminutes === 25 ? (
                  <option selected>25</option>
                ) : (
                  <option>25</option>
                )}
                {this.state.optionminutes === 30 ? (
                  <option selected>30</option>
                ) : (
                  <option>30</option>
                )}
                {this.state.optionminutes === 35 ? (
                  <option selected>35</option>
                ) : (
                  <option>35</option>
                )}
                {this.state.optionminutes === 40 ? (
                  <option selected>40</option>
                ) : (
                  <option>40</option>
                )}
                {this.state.optionminutes === 45 ? (
                  <option selected>45</option>
                ) : (
                  <option>45</option>
                )}
                {this.state.optionminutes === 50 ? (
                  <option selected>50</option>
                ) : (
                  <option>50</option>
                )}
                {this.state.optionminutes === 55 ? (
                  <option selected>55</option>
                ) : (
                  <option>55</option>
                )}
              </select>
              <button onClick={() => this.handleUpdate(e.id)}>update</button>
              <button onClick={() => this.setState({ editFlag: false })}>
                cancel
              </button>
            </span>
          ) : (
            ` ${hour(e.minutes)} ${minute(e.minutes)}`
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
        <select onChange={e => this.setState({ addhour: e.target.value })}>
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
        <select onChange={e => this.setState({ addminutes: e.target.value })}>
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
        <button onClick={() => this.handleEventAdd()}>Add</button>
        {slots}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    slots: state.slots,
    user: state.user
  };
}

export default connect(
  mapStateToProps,
  { getSlots, addSlot, deleteSlot, updateSlot }
)(Day7Slots);

function hour(min) {
  return min < 60 && typeof min === "number"
    ? ""
    : Math.floor(min / 60) === 1
      ? "1 hour"
      : typeof min === "number"
        ? `${moment.duration(min, "minutes")._data.hours} hours`
        : "";
}

function minute(min) {
  return min < 60 && typeof min === "number"
    ? `${min} minutes`
    : min % 60 === 0
      ? ""
      : `${min % 60} minutes`;
}
