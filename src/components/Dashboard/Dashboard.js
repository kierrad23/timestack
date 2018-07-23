import React, { Component } from "react";
import "./Dashboard.css";
import { Link, Switch, Route } from "react-router-dom";
import Overview from "../Overview/Overview";
import Day1Slots from "../Days/day1/day1slots";
import Day2Slots from "../Days/day2/day2slots";
import Day3Slots from "../Days/day3/day3slots";
import Day4Slots from "../Days/day4/day4slots";
import Day5Slots from "../Days/day5/day5slots";
import Day6Slots from "../Days/day6/day6slots";
import Day7Slots from "../Days/day7/day7slots";
import Day1Charts from "../Days/day1/day1charts";
import Day2Charts from "../Days/day2/day2charts";
import Day3Charts from "../Days/day3/day3charts";
import Day4Charts from "../Days/day4/day4charts";
import Day5Charts from "../Days/day5/day5charts";
import Day6Charts from "../Days/day6/day6charts";
import Day7Charts from "../Days/day7/day7charts";

class Dashboard extends Component {
  render() {
    return (
      <div className="dash">
        <nav className="logout">
          <button>
            <Link to="/"> Logout </Link>
          </button>
        </nav>
        <div className="day-parent">
          <div className="day">
            <Link to="/dashboard/day1"> Day 1</Link>
          </div>
          <div className="day">
            <Link to="/dashboard/day2"> Day 2</Link>
          </div>
          <div className="day">
            <Link to="/dashboard/day3"> Day 3</Link>
          </div>
          <div className="day">
            <Link to="/dashboard/day4"> Day 4</Link>
          </div>
          <div className="day">
            <Link to="/dashboard/day5"> Day 5</Link>
          </div>
          <div className="day">
            <Link to="/dashboard/day6"> Day 6</Link>
          </div>
        </div>
        <div className="bottom">
          <div className="screen">
            <Link to="/dashboard" className="viewlinks">
              Today
            </Link>
            <Link to="/dashboard/weekview" className="viewlinks">
              Entire Week
            </Link>
            <Switch>
              <Route exact path="/dashboard" component={Day7Charts} />
              <Route path="/dashboard/day1" component={Day1Charts} />
              <Route path="/dashboard/day2" component={Day2Charts} />
              <Route path="/dashboard/day3" component={Day3Charts} />
              <Route path="/dashboard/day4" component={Day4Charts} />
              <Route path="/dashboard/day5" component={Day5Charts} />
              <Route path="/dashboard/day6" component={Day6Charts} />
              <Route path="/dashboard/weekview" component={Overview} />
            </Switch>
          </div>
          <div className="slotholder">
            Slots
            <Switch>
              <Route exact path="/dashboard/" component={Day7Slots} />
              <Route path="/dashboard/day1" component={Day1Slots} />
              <Route path="/dashboard/day2" component={Day2Slots} />
              <Route path="/dashboard/day3" component={Day3Slots} />
              <Route path="/dashboard/day4" component={Day4Slots} />
              <Route path="/dashboard/day5" component={Day5Slots} />
              <Route path="/dashboard/day6" component={Day6Slots} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
