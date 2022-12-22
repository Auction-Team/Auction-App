/*
 *
 * Account actions
 *
 */

import { success } from 'react-notification-system-redux';
import axios from 'axios';

import {
  ACCOUNT_CHANGE,
  FETCH_PROFILE,
  CLEAR_ACCOUNT,
  SET_PROFILE_LOADING,
} from './constants';
import handleError from '../../utils/error';

export const accountChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: ACCOUNT_CHANGE,
    payload: formData,
  };
};

export const clearAccount = () => {
  return {
    type: CLEAR_ACCOUNT,
  };
};

export const setProfileLoading = (value) => {
  return {
    type: SET_PROFILE_LOADING,
    payload: value,
  };
};

export const fetchProfile = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(setProfileLoading(true));
      const response = await axios.get(`/api/auth/profile`);

      dispatch({ type: FETCH_PROFILE, payload: response.data.user });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setProfileLoading(false));
    }
  };
};

export const updateProfile = (img) => {
  return async (dispatch, getState) => {
    const user = getState().account.user;

    try {
      const profile = {
        firstName: user.firstName,
        lastName: user.lastName,
        province: user.province,
        district: user.district,
        ward: user.ward,
      };

      const response = await axios.put(
        `/api/user/update/profile`,
        profile
      );

      if (img) {
        var formData = new FormData();
        formData.append('file', img);

        await axios.post(`/api/user/upload`, formData);
      }

      const successfulOptions = {
        title: `Update profile successfully`,
        position: 'tr',
        autoDismiss: 1,
      };

      dispatch({ type: FETCH_PROFILE, payload: response.data.user });

      dispatch(success(successfulOptions));
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};
