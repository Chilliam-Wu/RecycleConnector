import axios from 'axios';
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
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
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

export const addPost =
  (name, category, price, description, newImage) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: ADD_POST_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      if (userInfo.token) {
        axios.defaults.headers.common['x-auth-token'] = userInfo.token;
      }

      const newPost = JSON.stringify({ name, category, price, description });

      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      const { data } = await axios.post(`${URL}/api/products`, newPost, config);
      const product_id = data._id;

      const uploadedImage = new FormData();
      uploadedImage.append('product_image', newImage);

      if (uploadedImage.get('product_image') !== '') {
        await axios.post(`${URL}/api/products/${product_id}`, uploadedImage, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      dispatch({ type: ADD_POST_SUCCESS });
    } catch (error) {
      dispatch({
        type: ADD_POST_FAIL,
        payload:
          error.response && error.response.data.msg
            ? error.response.data.msg
            : error.response,
      });
    }
  };

export const deletePost = (post_id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_POST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    if (userInfo.token) {
      axios.defaults.headers.common['x-auth-token'] = userInfo.token;
    }

    const {
      data: { msg },
    } = await axios.delete(`${URL}/api/products/${post_id}`);

    dispatch({ type: DELETE_POST_SUCCESS, payload: msg });
  } catch (error) {
    dispatch({
      type: DELETE_POST_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.response,
    });
  }
};
