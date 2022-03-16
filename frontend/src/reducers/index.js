import { combineReducers } from 'redux';
import {
  userRegisterReducer,
  userLoginReducer,
  userProfileEditReducer,
} from './userReducers';
import { allProductsReducer, productDetailsReducer } from './productReducers';

export default combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userProfileEdit: userProfileEditReducer,
  allProducts: allProductsReducer,
  productDetails: productDetailsReducer,
});
