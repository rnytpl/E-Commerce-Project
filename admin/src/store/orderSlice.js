import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllOrders = createAsyncThunk(
  "order/getOrders",
  async (token, thunkApi) => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/orders/getOrders",
        {
          headers: {
            token,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getIncome = createAsyncThunk(
  "order/income",
  async (token, thunkApi) => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/orders/income",
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

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    revenue: 0,
    orderMonth: null,
    percentage: null,
    isLoading: true,
    error: null,
  },
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getIncome.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getIncome.fulfilled, (state, action) => {
        state.isLoading = false;
        const data = action.payload;
        state.orderMonth = data[0]._id;
        state.revenue = data[0].total;
        state.percentage = (data[0].total * 100) / data[1].total - 100;
      })
      .addCase(getIncome.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
