import { combineReducers } from 'redux';
import { userRegisterReducer, userLoginReducer } from './userReducers';

export default combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
});
