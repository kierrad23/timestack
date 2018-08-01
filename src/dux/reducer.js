// import * as axcall from "./calls";
import axios from "axios";

const GET_ALL_SLOTS = "GET_ALL_SLOTS";
const GET_USER = "GET_USER";
const ADD_SLOT = "ADD_SLOT";

const initialState = {
  user: "",
  slots: [],
  weekdays: [0, 1, 2, 3, 4, 5, 6],
  today: new Date().getDay(),
  daywords: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_USER}_FULFILLED`:
      return Object.assign({}, state, { user: action.payload });
    case `${GET_ALL_SLOTS}_FULFILLED`:
      return Object.assign({}, state, { slots: action.payload });
    case `${ADD_SLOT}_FULFILLED`:
      return Object.assign({}, state, { slots: action.payload });
    default:
      return state;
  }
}
export function getSlots(day) {
  return {
    type: GET_ALL_SLOTS,
    payload: axios.get(`/api/dashboard/${day}`).then(res => res.data)
  };
}

export function checkUser() {
  return {
    type: GET_USER,
    payload: axios.get("/api/checkuser").then(res => res.data)
  };
}
export function addSlot(event, minutes, day, date) {
  return {
    type: ADD_SLOT,
    payload: axios
      .post("/api/addslot", { event, minutes, day, date })
      .then(res => res.data)
  };
}
