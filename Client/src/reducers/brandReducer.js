// reducers/brandReducer.js

import { ActionTypes } from '../actions/actionTypes';

const initialState = {
  brands: [],
  brand: null,
  loading: false,
  error: ''
};

const brandReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_BRANDS_REQUEST:
    case ActionTypes.FETCH_BRAND_REQUEST:
    case ActionTypes.CREATE_BRAND_REQUEST:
    case ActionTypes.UPDATE_BRAND_REQUEST:
    case ActionTypes.DELETE_BRAND_REQUEST:
      return {
        ...state,
        loading: true,
        error: ''
      };
    case ActionTypes.FETCH_BRANDS_SUCCESS:
      return {
        ...state,
        loading: false,
        brands: action.payload,
        error: ''
      };
    case ActionTypes.FETCH_BRAND_SUCCESS:
    case ActionTypes.CREATE_BRAND_SUCCESS:
    case ActionTypes.UPDATE_BRAND_SUCCESS:
      return {
        ...state,
        loading: false,
        brand: action.payload,
        error: ''
      };
    case ActionTypes.DELETE_BRAND_SUCCESS:
      return {
        ...state,
        loading: false,
        brand: null,
        error: ''
      };
    case ActionTypes.FETCH_BRANDS_FAILURE:
    case ActionTypes.FETCH_BRAND_FAILURE:
    case ActionTypes.CREATE_BRAND_FAILURE:
    case ActionTypes.UPDATE_BRAND_FAILURE:
    case ActionTypes.DELETE_BRAND_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default brandReducer;
