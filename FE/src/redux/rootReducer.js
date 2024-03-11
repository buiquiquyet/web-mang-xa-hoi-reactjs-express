// // rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import reducer from '../Reducer/useReducerMessager/reducer';
import reducerUploadImage from '../Reducer/useReducerUpdateImageUser/reducer';
import feedTextSlice from '../Reducer/feedText/feedTextSlice';

const rootReducer = combineReducers({
  messager: reducer,
  imageUpload: reducerUploadImage,
  feed: feedTextSlice
});

export default rootReducer;
