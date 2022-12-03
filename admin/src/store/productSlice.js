import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllProducts = createAsyncThunk(
  "product/getAllProducts",
  async (token, thunkApi) => {
    try {
      const response = await axios.get("http://localhost:4000/api/products", {
        headers: {
          token,
        },
      });
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async ({ id, token }, thunkApi) => {
    console.log(id, token, "deleteSlice");
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/products/${id}`,
        {
          headers: {
            token,
          },
        }
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async ({ product, token }, thunkApi) => {
    console.log(product, token, "productSlice.jsx");

    try {
      const response = await axios.post(
        `http://localhost:4000/api/products`,
        {
          ...product,
        },
        {
          headers: {
            token,
          },
        }
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoading = false;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addProduct.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteProduct.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
