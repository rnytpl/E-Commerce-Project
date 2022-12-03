import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (token, thunkAPI) => {
    try {
      console.log("cartSlice", token);

      const response = await axios.post("http://localhost:4000/api/orders", {
        data: {
          token: token,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    totalAmount: 0,
    totalQuantity: 0,
    success: false,
    isLoading: false,
  },
  reducers: {
    addProduct(state, action) {
      const { data, quantity, clr, sz } = action.payload;
      const newItem = data;
      const existingProduct = state.products.find(
        (item) => item._id === newItem._id
      );
      if (!existingProduct) {
        state.products.push({
          ...newItem,
          qty: quantity,
          sz: [sz],
          clr: [clr],
        });
        state.totalQuantity = state.totalQuantity + 1;
        state.totalAmount = state.totalAmount + newItem.price * quantity;
      } else {
        existingProduct.qty = existingProduct.qty + quantity;
        existingProduct.clr = [existingProduct.clr, clr];
        existingProduct.sz = [existingProduct.sz, sz];
        state.totalAmount =
          state.totalAmount + existingProduct.price * quantity;
      }
    },
    incrementQty(state, action) {
      const item = action.payload;
      const existingProduct = state.products.find((i) => i._id === item._id);
      if (existingProduct) {
        existingProduct.qty = existingProduct.qty + 1;
        state.totalAmount = state.totalAmount + existingProduct.price;
      }
    },
    decrementQty(state, action) {
      const item = action.payload;
      const existingProduct = state.products.find((i) => i._id === item._id);
      if (existingProduct) {
        existingProduct.qty = existingProduct.qty - 1;
        state.totalAmount = state.totalAmount - existingProduct.price;
      }
    },
    deleteProduct(state, action) {
      const item = action.payload;
      const findItem = state.products.find((i) => i._id === item._id);
      state.products = state.products.filter((i) => i._id !== findItem._id);
      state.totalAmount = state.totalAmount - findItem.price * findItem.qty;
      state.totalQuantity = state.totalQuantity - 1;
    },
  },
  extraReducers: {
    [createOrder.pending]: (state) => {
      state.isLoading = true;
    },
    [createOrder.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    },
    [createOrder.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});
export const cartActions = cartSlice.actions;
