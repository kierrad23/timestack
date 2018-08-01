import axios from "axios";

export const getSlots = day =>
  axios.get(`/api/dashboard/${day}`).then(res => res.data);

export const getUser = () => {
  return axios.get("/api/checkuser").then(res => res.data);
};
export const addUser = (event, minutes, userid, day) => {
  return axios
    .post("/api/addslot", { event, minutes, userid, day })
    .then(res => res.data);
};
