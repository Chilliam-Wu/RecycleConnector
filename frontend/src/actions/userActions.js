import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
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
