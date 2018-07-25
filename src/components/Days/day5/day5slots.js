import React, { Component } from "react";
import { connect } from "react-redux";
import { getSlots } from "../../../dux/reducer";

class Day5Slots extends Component {
  render() {
    return <h4>Day Five's Slots</h4>;
  }
}

function mapStateToProps(state) {
  return {
    slots: state.slotType
  };
}

export default connect(
  mapStateToProps,
  { getSlots }
)(Day5Slots);
