import React, { Component } from "react";
import { connect } from "react-redux";
import { getSlots } from "../../dux/reducer";
import m from "moment";

class PreviousSlots extends Component {
  render() {
    let allslots = this.props.slots.map((e, i) => (
      <div className="each_slot" key={i}>
        Time:{` ${hour(e.minutes)} ${minute(e.minutes)}`}
        Event: {e.event}
      </div>
    ));
    return (
      <div>
        {allslots}
        {/* <h1></h1> */}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    slots: state.slots
  };
}

export default connect(
  mapStateToProps,
  { getSlots }
)(PreviousSlots);

function hour(min) {
  return min < 60 && typeof min === "number"
    ? ""
    : Math.floor(min / 60) === 1
      ? "1 hour"
      : typeof min === "number"
        ? `${m.duration(min, "minutes")._data.hours} hours`
        : "";
}

function minute(min) {
  return min < 60 && typeof min === "number"
    ? `${min} minutes`
    : min % 60 === 0
      ? ""
      : `${min % 60} minutes`;
}
