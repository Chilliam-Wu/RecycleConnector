import axios from 'axios';
import {
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  GET_POST_FAIL,
} from '../constants/postConstants';
import { URL } from '../constants/urlConstants';

export const getPosts = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_POST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    if (userInfo.token) {
      axios.defaults.headers.common['x-auth-token'] = userInfo.token;
    }

    const { data } = await axios.get(`${URL}/api/posts`);
    dispatch({ type: GET_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_POST_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.response,
    });
  }
};
