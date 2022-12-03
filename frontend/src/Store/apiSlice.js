import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { loginStart, loginSuccess, loginFailure } from "./userSlice";
import { publicRequest } from "../axios instance/axiosInstances";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/api" }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (cat) => (!cat ? "/products" : `/products?category=${cat}`),
    }),
    getProduct: builder.query({
      query: (id) => `products/find/${id}`,
    }),
  }),
});

export const { useGetAllProductsQuery, useGetProductQuery } = productsApi;

export const userLogin = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};
