import React, { Component } from "react";
import { connect } from "react-redux";
import { getSlots } from "../../../dux/reducer";

class Day7Slots extends Component {
  componentDidMount() {
    let days = this.props.day.indexOf(new Date().getDay());
    console.log(days);
    let day = new Date().getDay();
    this.props.getSlots(day);
  }
  render() {
    let slots = this.props.slots.map((e, i) => (
      <div key={i}>
        Event : {e.event}
        Minutes : {e.minutes}
      </div>
    ));
    return <div>{slots}</div>;
  }
}
function mapStateToProps(state) {
  return {
    slots: state.slots,
    day: state.day
  };
}

export default connect(
  mapStateToProps,
  { getSlots }
)(Day7Slots);
