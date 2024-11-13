import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const initialState = {
  loading: false,
  WishlistItems: [],
  status: "",
};

const token=window.localStorage.getItem("token");

export const FETCH_WISHLIST = createAsyncThunk("Wishlist", async () => {
  return await axios({
    method: "get",
    url: `http://localhost:3001/product/fetchwishlist`,
    headers: {
      "x-auth-token": token,
    },
  }).then((response) => response);
});

export const REMOVE_FROM_WISHLIST = createAsyncThunk(
  "WishlistMethods",
  async (data) => {
    return await axios({
      method: "put",
      url: `http://localhost:3001/product/removefromwishlist`,
      headers: {
        "x-auth-token":token,
      },
      data: data,
    }).then((response) => response);
  }
);

export const ADD_TO_WISHLIST = createAsyncThunk(
  "WishlistMethods",
  async (data) => {
    return await axios({
      method: "put",
      url: `http://localhost:3001/product/addtowishlist`,
      headers: {
        "x-auth-token": token,
      },
      data: data,
    }).then((response) => response);
  }
);

export const WishlistSlice = createSlice({
  name: "Wishlist",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(FETCH_WISHLIST.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(FETCH_WISHLIST.fulfilled, (state, action) => {
      state.loading = false;
      state.WishlistItems = action.payload?.data;
      state.status = action.payload?.status;
    });
    builder.addCase(FETCH_WISHLIST.rejected, (state, action) => {
      state.loading = false;
      state.status = "500";
    });

    builder.addCase(ADD_TO_WISHLIST.fulfilled, (state, action) => {
      state.loading = false;
      state.WishlistItems = action.payload?.data;
      state.status = action.payload?.status;
    });
    builder.addCase(ADD_TO_WISHLIST.rejected, (state, action) => {
      state.loading = false;
      state.WishlistItems = state.WishlistItems;
    });
  },
});

export default WishlistSlice.reducer;
