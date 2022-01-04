import axios from 'axios';
import {
  ALL_PRODUCTS_FAIL,
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,

  ADMIN_PRODUCTS_REQUEST,
  ADMIN_PRODUCTS_SUCCESS,
  ADMIN_PRODUCTS_FAIL,

  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_RESET,
  NEW_PRODUCT_FAIL,

  DELETE_PRODUCT_REQUEST,
DELETE_PRODUCT_SUCCESS,
DELETE_PRODUCT_RESET,
DELETE_PRODUCT_FAIL,

  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,

  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_RESET,
  NEW_REVIEW_FAIL,
  
  CLEAR_ERRORS,
} from "../constants/productConstants";

//Product All Get and Pagenation, Filter
export const getProducts = (keyword='', currentPage, price, category, rating= 0) => async (dispatch) => {
    try {

      dispatch({ type: ALL_PRODUCTS_REQUEST });
      
      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`

      if (category) {
          link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&ratings[gte]=${rating}`
      }
      
      const { data } = await axios.get(link);
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


//Product Details.
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

export const newProduct = (productData) => async (dispatch) => {
  try {

      dispatch({ type: NEW_PRODUCT_REQUEST })

      const config = {
          headers: {
              'Content-Type': 'application/json'
          }
      }

      const { data } = await axios.post(`/api/v1/admin/product/new`, productData, config)

      dispatch({
          type: NEW_PRODUCT_SUCCESS,
          payload: data
      })

  } catch (error) {
    console.log(error.response);
      dispatch({
          type: NEW_PRODUCT_FAIL,
          payload: error.response.data.message
      })
  }
}

export const newReview = (reviewData) => async (dispatch) => {
  console.log(reviewData);
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(`/api/v1/review`, reviewData, config);
    console.log(data);

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAdminProducts = () => async (dispatch) => {
  try {

      dispatch({ type: ADMIN_PRODUCTS_REQUEST })

      const { data } = await axios.get(`/api/v1/admin/products`)

      dispatch({
          type: ADMIN_PRODUCTS_SUCCESS,
          payload: data.products
      })

  } catch (error) {

      dispatch({
          type: ADMIN_PRODUCTS_FAIL,
          payload: error.response.data.message
      })
  }
}

// Delete product (Admin)
export const deleteProduct = (id) => async (dispatch) => {
  try {

      dispatch({ type: DELETE_PRODUCT_REQUEST })

      const { data } = await axios.delete(`/api/v1/admin/product/${id}`)

      dispatch({
          type: DELETE_PRODUCT_SUCCESS,
          payload: data.success
      })

  } catch (error) {
      dispatch({
          type: DELETE_PRODUCT_FAIL,
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