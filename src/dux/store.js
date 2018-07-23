import { createStore, applyMiddleware } from "redux";
import reducer from "./reducer";
import rpm from "redux-promise-middleware";

export default createStore(reducer, applyMiddleware(rpm()));
