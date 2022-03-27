import {
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  GET_POST_FAIL,
  EDIT_POST_REQUEST,
  EDIT_POST_SUCCESS,
  EDIT_POST_FAIL,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAIL,
  ADD_POST_RESET,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
  DELETE_POST_RESET,
} from '../constants/postConstants';

export const postInfoReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case GET_POST_REQUEST:
      return { loading: true };
    case GET_POST_SUCCESS:
      return { loading: false, posts: action.payload };
    case GET_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postEditReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_POST_REQUEST:
      return { loading: true };
    case EDIT_POST_SUCCESS:
      return { loading: false, success: action.payload };
    case EDIT_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postAddReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return { loading: true };
    case ADD_POST_SUCCESS:
      return { loading: false, success: true };
    case ADD_POST_FAIL:
      return { loading: false, error: action.payload };
    case ADD_POST_RESET:
      return {};
    default:
      return state;
  }
};

export const postDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_POST_REQUEST:
      return { loading: true };
    case DELETE_POST_SUCCESS:
      return { loading: false, success: action.payload };
    case DELETE_POST_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_POST_RESET:
      return {};
    default:
      return state;
  }
};
