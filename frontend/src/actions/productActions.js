import axios from 'axios';
import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
} from '../constants/productConstants';
import { URL } from '../constants/urlConstants';

export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_REQUEST });

    const { data } = await axios.get(`${URL}/api/products`);
    dispatch({ type: ALL_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.response,
    });
  }
};
