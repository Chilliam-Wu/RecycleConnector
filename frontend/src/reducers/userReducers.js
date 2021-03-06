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
  EDIT_PROFILE_REQUEST,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAIL,
  EDIT_PROFILE_RESET,
  CONFIRM_PASSWORD_REQUEST,
  CONFIRM_PASSWORD_SUCCESS,
  CONFIRM_PASSWORD_FAIL,
  CONFIRM_PASSWORD_RESET,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  CHANGE_PASSWORD_RESET,
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

export const userProfileEditReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_PROFILE_REQUEST:
      return { loading: true };
    case EDIT_PROFILE_SUCCESS:
      return { loading: false, success: true };
    case EDIT_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case EDIT_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

export const userConfirmPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case CONFIRM_PASSWORD_REQUEST:
      return { loading: true };
    case CONFIRM_PASSWORD_SUCCESS:
      return { loading: false, success: action.payload };
    case CONFIRM_PASSWORD_FAIL:
      return { loading: true, error: action.payload };
    case CONFIRM_PASSWORD_RESET:
      return {};
    default:
      return state;
  }
};

export const userChangePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD_REQUEST:
      return { loading: true };
    case CHANGE_PASSWORD_SUCCESS:
      return { loading: false, success: action.payload };
    case CHANGE_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
    case CHANGE_PASSWORD_RESET:
      return {};
    default:
      return state;
  }
};
