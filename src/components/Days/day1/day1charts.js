import React, { Component } from "react";
import { connect } from "react-redux";
import { getSlotTypes } from "../../../dux/reducer";

class Day1Charts extends Component {
  render() {
    return <h3> Day One's Charts</h3>;
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
)(Day1Charts);
