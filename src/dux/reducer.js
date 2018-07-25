import * as axcall from "./calls";

const GET_ALL_SLOTS = "GET_ALL_SLOTS";

const initialState = {
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
    case `${GET_ALL_SLOTS}_FULFILLED`:
      return Object.assign({}, state, { slots: action.payload });
    default:
      return state;
  }
}
export function getSlots(day) {
  return {
    type: GET_ALL_SLOTS,
    payload: axcall.getSlots(day)
  };
}
