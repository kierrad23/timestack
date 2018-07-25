import React, { Component } from "react";
import { connect } from "react-redux";
import { getSlots } from "../../../dux/reducer";

class Day4Slots extends Component {
  render() {
    return <h4>Day Four's Slots</h4>;
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
)(Day4Slots);
