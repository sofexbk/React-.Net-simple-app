import brandReducer from '../reducers/brandReducer'
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
 reducer:{
   brandReducer
 }
});

export default store;
