import { publicRequest } from "../axios instance/axios";
import { loginFailure, loginStart, loginSuccess } from "./userSlice";

export const userApi = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const response = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(response.data));
  } catch (error) {
    dispatch(loginFailure(error));
  }
};
