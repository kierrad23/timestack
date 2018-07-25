import React, { Component } from "react";
import { connect } from "react-redux";
import { getSlots } from "../../../dux/reducer";

class Day1Slots extends Component {
  componentDidMount() {
    const { currentday, weekdays } = this.props;
    let yesterday =
      currentday - 1 < 0
        ? weekdays.indexOf(weekdays.length - Math.abs(currentday - 1))
        : currentday - 1;

    this.props.getSlots(yesterday);
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
    weekdays: state.weekdays,
    currentday: state.today
  };
}

export default connect(
  mapStateToProps,
  { getSlots }
)(Day1Slots);
