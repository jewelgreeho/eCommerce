import axios from 'axios';
import {
    ALL_PRODUCTS_FAIL, 
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS, 
    
    PRODUCT_DETAILS_FAIL, 
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,

    CLEAR_ERRORS
} from '../constants/productConstants';

//Product All Get and Pagenation, Filter
export const getProducts = (keyword='', currentPage) => async (dispatch) => {
    try {

      dispatch({ type: ALL_PRODUCTS_REQUEST });
      const { data } = await axios.get(`/api/v1/products?keyword=${keyword}&page=${currentPage}`);
      dispatch({
        type: ALL_PRODUCTS_SUCCESS,
        payload: data,
      });

    } catch (error) {

      dispatch({
        type: ALL_PRODUCTS_FAIL,
        payload: error.response.data.message,
      });

    }
  };

//Product Details
export const getProductDetails = (id) => async(dispatch) => {
    try {

        dispatch({ type: PRODUCT_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/v1/product/${id}`)
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

//Clear Erros
export const clearErrors = () => async(dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}