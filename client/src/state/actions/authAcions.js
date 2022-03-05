import { LOGIN } from "../constants/actionTypes";
import * as api from "../../api/index";

const signUp = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    const action = {
      type: LOGIN,
      payload: data,
    };
    dispatch(action);

    navigate("/");
  } catch (error) {
    console.error(error);
  }
};

const signIn = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    const action = {
      type: LOGIN,
      payload: data,
    };
    dispatch(action);

    navigate("/");
  } catch (error) {
    console.error(error);
  }
};

export { signIn, signUp };
