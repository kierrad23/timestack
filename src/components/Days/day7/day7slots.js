import React, { Component } from "react";
import { connect } from "react-redux";
import { getSlots } from "../../../dux/reducer";

class Day7Slots extends Component {
  componentDidMount() {
    this.props.getSlots(this.props.today);
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
    today: state.today
  };
}

export default connect(
  mapStateToProps,
  { getSlots }
)(Day7Slots);
