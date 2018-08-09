import React, { Component } from "react";
import { connect } from "react-redux";
import Doughnut from "react-chartjs-2";
import m from "moment";

class Day7Charts extends Component {
  handleChartData(arr) {
    const keyvaluepairsarray = arr.map(e => {
      return { [Object.values(e)[1]]: Object.values(e)[2] };
    });

    function getEvents(arr) {
      let emptyArr = [];
      arr.forEach(e => {
        let val = Object.values(e)[1];
        emptyArr.includes(val) || emptyArr.push(val);
      });
      return emptyArr;
    }
    function combineMinutes(eventmins) {
      return keyvaluepairsarray.reduce((acc, cur) => {
        return Object.keys(cur)[0] === eventmins
          ? acc + cur[eventmins]
          : acc + 0;
      }, 0);
    }
    const minutes = getEvents(arr).map(e => {
      return { [e]: combineMinutes(e) };
    });
    return Object.assign({}, ...minutes);
  }
  render() {
    const data = {
      datasets: [
        {
          data: Object.values(this.handleChartData(this.props.slots)),
          label: "",
          backgroundColor: ["blue", "purple", "red"]
        }
      ],
      labels: Object.keys(this.handleChartData(this.props.slots))
    };
    const options = {
      tooltips: {
        callbacks: {
          label: function(tooltipItem, data) {
            let mins = data.datasets[0]["data"][tooltipItem.index];
            let dataobj = m.duration(mins, "minutes")._data;
            return mins >= 60 ? `${dataobj.hours} hours` : `${mins} minutes`;
          }
        }
      }
    };
    return (
      <div className="myChart">
        {this.props.slots[0] === undefined ? (
          <h1>No Slots Recorded</h1>
        ) : (
          <Doughnut height={100} width={100} data={data} options={options} />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    slots: state.slots
  };
}

export default connect(mapStateToProps)(Day7Charts);
