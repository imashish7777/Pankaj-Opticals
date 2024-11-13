import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { message } from "antd";

export const initialState = {
  loading: false,
  ProductsItems: [],
  error: "",
  addProductIssucess: false,
  count: 0,
  limit: 0,
};

///fetch product////

export const FETCH_PRODUCTS = createAsyncThunk(
  "fetchproducts",
  async (data) => {
    return await axios({
      method: "post",
      url: `http://localhost:3001/product/fetchproducts?page=${data?.current}`,
      data: data,
      headers: {
        "x-auth-token": window.localStorage.getItem("admintoken"),
      },
    }).then((response) => response.data);
  }
);

export const productSlice = createSlice({
  name: "Products",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(FETCH_PRODUCTS.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(FETCH_PRODUCTS.fulfilled, (state, action) => {
      state.loading = false;
      state.ProductsItems = action.payload?.products;
      state.count = action.payload?.count;
      state.limit = action.payload?.limit;

      state.error = "No Error";
    });
    builder.addCase(FETCH_PRODUCTS.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "couldn't fetch products";
      message.error("something went wrong , couldn't get products");
    });
  },
});

export default productSlice.reducer;
