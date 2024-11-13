import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const initialState = {
  loading: false,
  cartItems: {},
  status: "",
  couponStatus: "notApplied",
};

const token = window.localStorage.getItem("token");

export const FETCH_CART = createAsyncThunk("cart", async () => {
  return axios({
    method: "get",
    url: `http://localhost:3001/product/fetchcart`,
    headers: {
      "x-auth-token": token,
    },
  }).then((response) => response);
});

export const ADD_TO_CART = createAsyncThunk("cartmethod", async (data) => {
  return axios({
    method: "post",
    url: `http://localhost:3001/product/addtocart`,
    data: data,
    headers: {
      "x-auth-token": token,
    },
  }).then((response) => response);
});

export const REMOVE_FROM_CART = createAsyncThunk("cartmethod", async (data) => {
  return axios({
    method: "post",
    url: `http://localhost:3001/product/removefromcart`,
    headers: {
      "x-auth-token": token,
    },
    data: data,
  }).then((response) => response);
});

export const DECREMENT = createAsyncThunk("cartmethod", async (data) => {
  return axios({
    method: "post",
    url: `http://localhost:3001/product/decrement`,
    headers: {
      "x-auth-token": token,
    },
    data: data,
  }).then((response) => response);
});

export const INCREMENT = createAsyncThunk("cartmethod", async (data) => {
  return axios({
    method: "post",
    url: `http://localhost:3001/product/increment`,
    headers: {
      "x-auth-token": token,
    },
    data: data,
  }).then((response) => response);
});

export const APPLY_COUPON = createAsyncThunk("couponmethod", async (data) => {
  return axios({
    method: "post",
    url: `http://localhost:3001/product/applycoupon`,
    headers: {
      "x-auth-token": token,
    },
    data: data,
  }).then((response) => response);
});
export const REMOVE_COUPON = createAsyncThunk("couponmethod", async (data) => {
  return axios({
    method: "put",
    url: `http://localhost:3001/product/removecoupon`,
    headers: {
      "x-auth-token": token,
    },
    data: data,
  }).then((response) => response);
});

export const emptycart = createAsyncThunk("cartmethod", async (req, res) => {
  return axios({
    method: "delete",
    url: "http://localhost:3001/product/emptycart",
    headers: {
      "x-auth-token": token,
    },
  }).then((response) => response);
});

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(FETCH_CART.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(FETCH_CART.fulfilled, (state, action) => {
      state.loading = false;

      if (action.payload?.data) {
        state.cartItems = action.payload?.data;
       

        state.status = "200";
      }
    });

    builder.addCase(FETCH_CART.rejected, (state, action) => {
      state.loading = false;
      state.status = "500";
    });
    builder.addCase(ADD_TO_CART.fulfilled, (state, action) => {
      state.loading = false;

      if (action.payload?.data) {
        state.cartItems = action.payload?.data;

        state.status = "200";
      }
    });

    builder.addCase(ADD_TO_CART.rejected, (state, action) => {
      state.loading = false;
      state.status = "500";
    });
    builder.addCase(APPLY_COUPON.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload?.data == "COUPON EXPIRED") {
        state.couponStatus = "INVAILID COUPON";
      } else {
        state.cartItems = action.payload?.data;

        state.status = "200";
      }
    });

    builder.addCase(APPLY_COUPON.rejected, (state, action) => {
      state.loading = false;
      state.status = "500";
    });
  },
});

export default CartSlice.reducer;
