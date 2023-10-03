import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import deck from "./deck";

export default combineReducers({
  auth,
  message,
  deck,
});
