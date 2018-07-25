import axios from "axios";

export const getSlots = day =>
  axios.get(`/api/dashboard/${day}`).then(res => res.data);
