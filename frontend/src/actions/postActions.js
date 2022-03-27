import axios from 'axios';
import {
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  GET_POST_FAIL,
  EDIT_POST_REQUEST,
  EDIT_POST_SUCCESS,
  EDIT_POST_FAIL,
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

export const editPost =
  (name, price, category, description, post_id) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: EDIT_POST_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      if (userInfo.token) {
        axios.defaults.headers.common['x-auth-token'] = userInfo.token;
      }

      const newDetails = JSON.stringify({ name, price, category, description });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        `${URL}/api/posts/edit/${post_id}`,
        newDetails,
        config
      );
      dispatch({ type: EDIT_POST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: EDIT_POST_FAIL,
        payload:
          error.response && error.response.data.msg
            ? error.response.data.msg
            : error.response,
      });
    }
  };
