import React, { Component } from "react";
import { connect } from "react-redux";
import { getSlotTypes } from "../../../dux/reducer";

class Day1Slots extends Component {
  render() {
    return <h4>Day One's Slots</h4>;
  }
}

function mapStateToProps(state) {
  return {
    slots: state.slotType
  };
}

export default connect(
  mapStateToProps,
  { getSlotTypes }
)(Day1Slots);
