import { combineReducers } from 'redux';
import { userRegisterReducer, userLoginReducer } from './userReducers';
import { allProductsReducer } from './productReducers';

export default combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  allProducts: allProductsReducer,
});
