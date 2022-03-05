import { combineReducers } from "redux";
import postReducer from "./postReducer";
import authReducer from "./authReducer";

const allReducers = combineReducers({
  postReducer,
  authReducer,
});

export default allReducers;
