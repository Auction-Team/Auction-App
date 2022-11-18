import httpRequest from "../../services/httpRequest";
import { AuthAPI } from "../configs/auth";

const login = async (body) => {
  try {
    const response = await httpRequest(AuthAPI.login(body));
    return response;
  } catch (err) {
    return err.response.data;
  }
};
const registerAccount = async (body) => {
  try {
    const response = await httpRequest(AuthAPI.registerAccount(body));
    return response;
  } catch (err) {
    return err.response.data;
  }
};
const forgotPassword = async (body) => {
  try {
    const response = await httpRequest(AuthAPI.forgotPassword(body));
    return response;
  } catch (err) {
    return err.response.data;
  }
};
const changePassword = async (id, body) => {
  try {
    const response = await httpRequest(AuthAPI.changePassword(id, body));
    return response;
  } catch (err) {
    return err.response.data;
  }
};
const verifyOTP = async (body) => {
  try {
    const response = await httpRequest(AuthAPI.verifyOTP(body));
    return response;
  } catch (err) {
    return err.response.data;
  }
};
const newPassword = async (body) => {
  try {
    const response = await httpRequest(AuthAPI.newPassword(body));
    return response;
  } catch (err) {
    return err.response.data;
  }
};
const authServices = {
  login,
  registerAccount,
  forgotPassword,
  verifyOTP,
  newPassword,
  changePassword,
};
export default authServices;
