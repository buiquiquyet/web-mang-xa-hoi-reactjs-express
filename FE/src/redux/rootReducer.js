// // rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import reducer from './../useReducerMessager/reducer';
import reducerUploadImage from './../useReducerUpdateImageUser/reducer';

const rootReducer = combineReducers({
  messager: reducer,
  imageUpload: reducerUploadImage
});

export default rootReducer;
