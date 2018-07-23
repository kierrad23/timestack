//import * as axcalls from "./calls";

const GET_ALL_SLOTS = "GET_ALL_SLOTS";

const initialState = {
  slotType: ["Sleep", "Work"]
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_ALL_SLOTS}_FULFILLED`:
      return state.slotType;
    default:
      return state;
  }
}
export const getSlotTypes = () => {
  return {
    type: GET_ALL_SLOTS
  };
};
