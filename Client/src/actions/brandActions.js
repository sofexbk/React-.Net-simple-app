import axios from 'axios';
import { ActionTypes } from './actionTypes';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

export const fetchBrandsRequest = () => ({
    type: ActionTypes.FETCH_BRANDS_REQUEST
  });
  
  const fetchBrandsSuccess = (brands) => ({
    type: ActionTypes.FETCH_BRANDS_SUCCESS,
    payload: brands
  });
  
  export const fetchBrandsFailure = (error) => ({
    type: ActionTypes.FETCH_BRANDS_FAILURE,
    payload: error
  });
  export const fetchBrands = () => {
    return async (dispatch) => {
      dispatch(fetchBrandsRequest());
      try {
        const response = await axios.get('/api/Brand');
        dispatch(fetchBrandsSuccess(response.data));
      } catch (error) {
        dispatch(fetchBrandsFailure('An error occurred'));
      }
    };
  };

export const fetchBrandRequest = () => ({
  type: ActionTypes.FETCH_BRAND_REQUEST
});

export const fetchBrandSuccess = (brand) => ({
  type: ActionTypes.FETCH_BRAND_SUCCESS,
  payload: brand
});

export const fetchBrandFailure = (error) => ({
  type: ActionTypes.FETCH_BRAND_FAILURE,
  payload: error
});

export const fetchBrandById = (id) => {
  return async (dispatch) => {
    dispatch(fetchBrandRequest());
    try {
      const response = await axios.get(`/api/Brand/${id}`);
      dispatch(fetchBrandSuccess(response.data));
    } catch (error) {
      dispatch(fetchBrandFailure(error.message));
    }
  };
};

export const updateBrandRequest = () => ({
  type: ActionTypes.UPDATE_BRAND_REQUEST
});

export const updateBrandSuccess = (brand) => ({
  type: ActionTypes.UPDATE_BRAND_SUCCESS,
  payload: brand
});

export const updateBrandFailure = (error) => ({
  type: ActionTypes.UPDATE_BRAND_FAILURE,
  payload: error
});

export const updateBrand = (id, updatedBrand) => {
  return async (dispatch) => {
    dispatch(updateBrandRequest());
    try {
      const response = await axios.put(`/api/Brand/${id}`, updatedBrand); 
      dispatch(updateBrandSuccess(response.data));
    } catch (error) {
      dispatch(updateBrandFailure(error.message));
    }
  };
};

export const deleteBrandRequest = () => ({
  type: ActionTypes.DELETE_BRAND_REQUEST
});

export const deleteBrandSuccess = () => ({
  type: ActionTypes.DELETE_BRAND_SUCCESS
});

export const deleteBrandFailure = (error) => ({
  type: ActionTypes.DELETE_BRAND_FAILURE,
  payload: error
});

export const deleteBrand = (id) => {
  return async (dispatch) => {
    dispatch(deleteBrandRequest());
    try {
      await axios.delete(`/api/Brand/${id}`);
      dispatch(deleteBrandSuccess());
      toast.success('Brand Deleted successfully!');

    } catch (error) {
      dispatch(deleteBrandFailure(error.message));
      toast.error('An error occurred while deleting the brand.');

    }
  };
};

export const createBrandRequest = () => ({
  type: ActionTypes.CREATE_BRAND_REQUEST
});

const createBrandSuccess = (brand) => ({
  type: ActionTypes.CREATE_BRAND_SUCCESS,
  payload: brand
});

export const createBrandFailure = (error) => ({
  type: ActionTypes.CREATE_BRAND_FAILURE,
  payload: error
});

export const createBrand = (newBrand) => {
  console.log('Creating brand:', newBrand);
  return async (dispatch) => {
    dispatch(createBrandRequest());
    try {
      const response = await axios.post('/api/Brand', newBrand);
      dispatch(createBrandSuccess(response.data));
      toast.success('Brand created successfully!');
    } catch (error) {
      console.error('Error creating brand:', error);
      if (error.response && error.response.data && error.response.data.message) {
        const errorMessage = error.response.data.message;
        dispatch(createBrandFailure(errorMessage));
        toast.error(`Failed to create brand: ${errorMessage}`);
      } else {
        dispatch(createBrandFailure('An error occurred while creating the brand.'));
        toast.error('An error occurred while creating the brand.');
      }
    }
  };
};