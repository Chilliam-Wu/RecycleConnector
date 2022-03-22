import { combineReducers } from 'redux';
import {
  userRegisterReducer,
  userLoginReducer,
  userProfileEditReducer,
  userConfirmPasswordReducer,
  userChangePasswordReducer,
} from './userReducers';
import { allProductsReducer, productDetailsReducer } from './productReducers';
import { postInfoReducer } from './postReducers';

export default combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userProfileEdit: userProfileEditReducer,
  userConfirmPassword: userConfirmPasswordReducer,
  userChangePassword: userChangePasswordReducer,
  allProducts: allProductsReducer,
  productDetails: productDetailsReducer,
  postInfo: postInfoReducer,
});
