import {
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  GET_POST_FAIL,
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
