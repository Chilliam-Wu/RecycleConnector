import {
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL,
  GET_CART_DETAILS_REQUEST,
  GET_CART_DETAILS_SUCCESS,
  GET_CART_DETAILS_FAIL,
  ADD_TO_CART_RESET,
} from '../constants/cartConstants';

export const cartAddReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_TO_CART_REQUEST:
      return { loading: true };
    case ADD_TO_CART_SUCCESS:
      return { loading: false, success: action.payload };
    case ADD_TO_CART_FAIL:
      return { loading: false, error: action.payload };
    case ADD_TO_CART_RESET:
      return {};
    default:
      return state;
  }
};

export const cartDetailsReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case GET_CART_DETAILS_REQUEST:
      return { loading: true };
    case GET_CART_DETAILS_SUCCESS:
      return {
        loading: false,
        cartItems: action.payload ? action.payload : [],
      };
    case GET_CART_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
