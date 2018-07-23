import React, { Component } from "react";
import { connect } from "react-redux";
import { getSlotTypes } from "../../../dux/reducer";

class Day2Slots extends Component {
  render() {
    return <h4>Day Two's Slots</h4>;
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
)(Day2Slots);
