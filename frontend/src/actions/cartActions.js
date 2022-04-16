import {
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL,
  DELETE_FROM_CART_REQUEST,
  DELETE_FROM_CART_SUCCESS,
  DELETE_FROM_CART_FAIL,
  GET_CART_DETAILS_REQUEST,
  GET_CART_DETAILS_SUCCESS,
  GET_CART_DETAILS_FAIL,
} from '../constants/cartConstants';
import axios from 'axios';
import { URL } from '../constants/urlConstants';

export const addToCart = (product_id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_TO_CART_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    if (userInfo.token) {
      axios.defaults.headers.common['x-auth-token'] = userInfo.token;
    }
    const {
      data: { msg },
    } = await axios.post(`${URL}/api/carts/${product_id}`);
    dispatch({ type: ADD_TO_CART_SUCCESS, payload: msg });
  } catch (error) {
    dispatch({
      type: ADD_TO_CART_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.response,
    });
  }
};

export const getCartDetails = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_CART_DETAILS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    if (userInfo.token) {
      axios.defaults.headers.common['x-auth-token'] = userInfo.token;
    }

    const {
      data: { cartItems },
    } = await axios.get(`${URL}/api/carts`);
    dispatch({ type: GET_CART_DETAILS_SUCCESS, payload: cartItems });
  } catch (error) {
    dispatch({
      type: GET_CART_DETAILS_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.response,
    });
  }
};

export const deleteFromCart = (product_id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_FROM_CART_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    if (userInfo.token) {
      axios.defaults.headers.common['x-auth-token'] = userInfo.token;
    }

    const {
      data: { msg },
    } = await axios.delete(`${URL}/api/carts/${product_id}`);

    dispatch({ type: DELETE_FROM_CART_SUCCESS, payload: msg });
  } catch (error) {
    dispatch({
      type: DELETE_FROM_CART_FAIL,
      payload:
        error.response.data.msg && error.response
          ? error.response.data.msg
          : error.response,
    });
  }
};
