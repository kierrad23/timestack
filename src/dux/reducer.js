// import * as axcall from "./calls";
import axios from "axios";

const GET_ALL_SLOTS = "GET_ALL_SLOTS";
const GET_USER = "GET_USER";
const ADD_SLOT = "ADD_SLOT";
const DELETE_SLOT = "DELETE_SLOT";
const UPDATE_SLOT = "UPDATE_SLOT";

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
    case `${DELETE_SLOT}_FULFILLED`:
      return Object.assign({}, state, { slots: action.payload });
    case `${UPDATE_SLOT}_FULFILLED`:
      return Object.assign({}, state, { slots: action.payload });
    default:
      return state;
  }
}
export function getSlots(date) {
  return {
    type: GET_ALL_SLOTS,
    payload: axios.get(`/api/dashboard/${date}`).then(res => res.data)
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
export function deleteSlot(slotid) {
  return {
    type: DELETE_SLOT,
    payload: axios.delete(`/api/deleteslot/${slotid}`).then(res => res.data)
  };
}

export function updateSlot(slotid, minutes) {
  return {
    type: UPDATE_SLOT,
    payload: axios
      .put(`/api/updateslot/${slotid}`, { minutes })
      .then(res => res.data)
  };
}
