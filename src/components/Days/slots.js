import React, { Component } from "react";
import { connect } from "react-redux";
import { getSlots } from "../../dux/reducer";

class PreviousSlots extends Component {
  render() {
    let slots = this.props.slots.map((e, i) => (
      <div key={i}>
        Event : {e.event}
        Minutes : {e.minutes}
        <button>Delete</button>
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
)(PreviousSlots);
