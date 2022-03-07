import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  REGISTER_RESET,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_RESET,
  LOGOUT,
} from '../constants/userConstants';

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return { loading: true };
    case REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload, success: true };
    case REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case REGISTER_RESET:
      return {};
    default:
      return state;
  }
};

export const userLoginReducer = (state = { userInfo: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { loading: true };
    case LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case LOGIN_FAIL:
      return { loadng: false, error: action.payload };
    case LOGIN_RESET:
      return {};
    case LOGOUT:
      return {};
    default:
      return state;
  }
};
