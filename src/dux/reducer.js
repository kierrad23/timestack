import axios from "axios";

const GET_USER = "GET_USER";
const LOGOUT = "LOGOUT";

const GET_SLOTS = "GET_SLOTS";
const ADD_SLOT = "ADD_SLOT";
const DELETE_SLOT = "DELETE_SLOT";
const UPDATE_SLOT = "UPDATE_SLOT";
const CLEAR_SLOTS = "CLEAR_SLOTS";

const GET_ALL_NOTES = "GET_ALL_NOTES";
const ADD_NOTE = "ADD_NOTE";
const DELETE_NOTE = "DELETE_NOTE";
const UPDATE_NOTE = "UPDATE_NOTE";

const GET_ALL_LIMITS = "GET_ALL_LIMITS";
const ADD_LIMIT = "ADD_LIMIT";
const DELETE_LIMIT = "DELETE_LIMIT";
const GET_ALL_SLOTS = "GET_ALL_SLOTS";

const initialState = {
  user: "",
  slots: [],
  allslots: [],
  notes: [],
  limits: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_USER}_FULFILLED`:
      return Object.assign({}, state, { user: action.payload });
    case `${GET_SLOTS}_FULFILLED`:
      return Object.assign({}, state, { slots: action.payload });
    case `${ADD_SLOT}_FULFILLED`:
      return Object.assign({}, state, { slots: action.payload });
    case `${DELETE_SLOT}_FULFILLED`:
      return Object.assign({}, state, { slots: action.payload });
    case `${UPDATE_SLOT}_FULFILLED`:
      return Object.assign({}, state, { slots: action.payload });
    case `${CLEAR_SLOTS}`:
      return Object.assign({}, state, { slots: action.payload });
    case `${GET_ALL_NOTES}_FULFILLED`:
      return Object.assign({}, state, { notes: action.payload });
    case `${ADD_NOTE}_FULFILLED`:
      return Object.assign({}, state, { notes: action.payload });
    case `${DELETE_NOTE}_FULFILLED`:
      return Object.assign({}, state, { notes: action.payload });
    case `${UPDATE_NOTE}_FULFILLED`:
      return Object.assign({}, state, { notes: action.payload });
    case `${GET_ALL_SLOTS}_FULFILLED`:
      return Object.assign({}, state, { allslots: action.payload });
    case `${GET_ALL_LIMITS}_FULFILLED`:
      return Object.assign({}, state, { limits: action.payload });
    case `${ADD_LIMIT}_FULFILLED`:
      return Object.assign({}, state, { limits: action.payload });
    case `${DELETE_LIMIT}_FULFILLED`:
      return Object.assign({}, state, { limits: action.payload });
    default:
      return state;
  }
}
export function logout() {
  return {
    type: LOGOUT,
    payload: axios.post("/logout").then(res => res.data)
  };
}
export function checkUser() {
  return {
    type: GET_USER,
    payload: axios.get("/api/checkuser").then(res => res.data)
  };
}
export function getSlots(date) {
  return {
    type: GET_SLOTS,
    payload: axios.get(`/api/dashboard/${date}`).then(res => res.data)
  };
}

export function addSlot(event, minutes, date) {
  return {
    type: ADD_SLOT,
    payload: axios
      .post("/api/addslot", { event, minutes, date })
      .then(res => res.data)
  };
}
export function deleteSlot(slotid, date) {
  return {
    type: DELETE_SLOT,
    payload: axios
      .delete(`/api/deleteslot/?id=${slotid}&date=${date}`)
      .then(res => res.data)
  };
}

export function updateSlot(slotid, minutes, date) {
  return {
    type: UPDATE_SLOT,
    payload: axios
      .put(`/api/updateslot/${slotid}`, { minutes, date })
      .then(res => res.data)
  };
}

export function clearSlots() {
  return {
    type: CLEAR_SLOTS,
    payload: []
  };
}

export function getNotes() {
  return {
    type: GET_ALL_NOTES,
    payload: axios.get(`/api/notes`).then(res => res.data)
  };
}

export function addNote(note, date) {
  return {
    type: ADD_NOTE,
    payload: axios.post("/api/addnote", { note, date }).then(res => res.data)
  };
}
export function updateNote(noteid, note) {
  return {
    type: UPDATE_NOTE,
    payload: axios
      .put(`/api/updatenote/${noteid}`, { note })
      .then(res => res.data)
  };
}
export function deleteNote(noteid) {
  return {
    type: DELETE_NOTE,
    payload: axios.delete(`/api/deletenote/${noteid}`).then(res => res.data)
  };
}

export function getLimits() {
  return {
    type: GET_ALL_LIMITS,
    payload: axios.get(`/api/limits`).then(res => res.data)
  };
}

export function addLimit(event, limit) {
  return {
    type: ADD_LIMIT,
    payload: axios.post("/api/addlimit", { event, limit }).then(res => res.data)
  };
}

export function deleteLimit(id) {
  return {
    type: DELETE_LIMIT,
    payload: axios.delete(`/api/deletelimit/${id}`).then(res => res.data)
  };
}
export function getAllSlots(start, end) {
  return {
    type: GET_ALL_SLOTS,
    payload: axios
      .get(`/api/slots/?start=${start}&end=${end}`)
      .then(res => res.data)
  };
}
