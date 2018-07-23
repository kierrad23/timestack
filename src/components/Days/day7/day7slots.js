import React, { Component } from "react";
import { connect } from "react-redux";
import { getSlotTypes } from "../../../dux/reducer";

class Day7Slots extends Component {
  render() {
    console.log("hi");
    return <h4>Today's Slots</h4>;
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
)(Day7Slots);
