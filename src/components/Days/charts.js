import React, { Component } from "react";
import { connect } from "react-redux";

class PreviousCharts extends Component {
  render() {
    return <h3> Day One's Charts</h3>;
  }
}
function mapStateToProps(state) {
  return {
    slots: state.slotType
  };
}

export default connect(mapStateToProps)(PreviousCharts);
