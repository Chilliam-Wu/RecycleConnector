import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  EDIT_PROFILE_REQUEST,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAIL,
  CONFIRM_PASSWORD_REQUEST,
  CONFIRM_PASSWORD_SUCCESS,
  CONFIRM_PASSWORD_FAIL,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
} from '../constants/userConstants';
import axios from 'axios';
import { URL } from '../constants/urlConstants';

export const register = (username, email, password) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });

    const registerUser = JSON.stringify({ username, email, password });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const {
      data: { user },
    } = await axios.post(`${URL}/api/users/register`, registerUser, config);

    dispatch({ type: REGISTER_SUCCESS, payload: user });
    dispatch({ type: LOGIN_SUCCESS, payload: user });

    localStorage.setItem('userInfo', JSON.stringify(user));
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.response,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const loginUser = JSON.stringify({ email, password });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const {
      data: { user },
    } = await axios.post(`${URL}/api/users/login`, loginUser, config);
    dispatch({ type: LOGIN_SUCCESS, payload: user });
    localStorage.setItem('userInfo', JSON.stringify(user));
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.response,
    });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: LOGOUT });
};

export const editProfile =
  (id, username, newAvatar) => async (dispatch, getState) => {
    try {
      dispatch({ type: EDIT_PROFILE_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();

      if (userInfo.token) {
        axios.defaults.headers.common['x-auth-token'] = userInfo.token;
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const updatedProfile = JSON.stringify({ username });

      const updatedAvatar = new FormData();
      updatedAvatar.append('avatar', newAvatar);

      if (updatedAvatar.get('avatar') !== '') {
        await axios.post(`${URL}/api/avatars`, updatedAvatar, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      const {
        data: { user },
      } = await axios.put(`${URL}/api/users/${id}`, updatedProfile, config);

      dispatch({ type: EDIT_PROFILE_SUCCESS });
      dispatch({ type: LOGIN_SUCCESS, payload: user });

      localStorage.setItem('userInfo', JSON.stringify(user));
    } catch (error) {
      dispatch({
        type: EDIT_PROFILE_FAIL,
        payload:
          error.response && error.response.data.msg
            ? error.response.data.msg
            : error.response,
      });
    }
  };

export const confirmPassword = (id, password) => async (dispatch, getState) => {
  try {
    dispatch({ type: CONFIRM_PASSWORD_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    if (userInfo.token) {
      axios.defaults.headers.common['x-auth-token'] = userInfo.token;
    }

    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    const confirmPassword = JSON.stringify({ password });

    const {
      data: { msg },
    } = await axios.post(
      `${URL}/api/users/${id}/confirmPassword`,
      confirmPassword,
      config
    );

    dispatch({ type: CONFIRM_PASSWORD_SUCCESS, payload: msg });
  } catch (error) {
    dispatch({
      type: CONFIRM_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.response,
    });
  }
};

export const changePassword = (id, password) => async (dispatch, getState) => {
  try {
    dispatch({ type: CHANGE_PASSWORD_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    if (userInfo.token) {
      axios.defaults.headers.common['x-auth-token'] = userInfo.token;
    }

    const newPassword = JSON.stringify({ password });

    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    const {
      data: { msg },
    } = await axios.put(
      `${URL}/api/users/${id}/changePassword`,
      newPassword,
      config
    );

    dispatch({ type: CHANGE_PASSWORD_SUCCESS, payload: msg });
  } catch (error) {
    dispatch({
      type: CHANGE_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.response,
    });
  }
};
