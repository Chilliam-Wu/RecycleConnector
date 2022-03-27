import { combineReducers } from 'redux';
import {
  userRegisterReducer,
  userLoginReducer,
  userProfileEditReducer,
  userConfirmPasswordReducer,
  userChangePasswordReducer,
} from './userReducers';
import { allProductsReducer, productDetailsReducer } from './productReducers';
import {
  postInfoReducer,
  postEditReducer,
  postAddReducer,
  postDeleteReducer,
} from './postReducers';

export default combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userProfileEdit: userProfileEditReducer,
  userConfirmPassword: userConfirmPasswordReducer,
  userChangePassword: userChangePasswordReducer,
  allProducts: allProductsReducer,
  productDetails: productDetailsReducer,
  postInfo: postInfoReducer,
  postEdit: postEditReducer,
  postAdd: postAddReducer,
  postDelete: postDeleteReducer,
});
