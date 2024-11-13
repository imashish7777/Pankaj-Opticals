import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: "false",
  addresses: [],
  error: "",
};

const token=window.localStorage.getItem("token");


export const fetchaddress = createAsyncThunk("address", async () => {
  return await axios({
    method: "get",
    url: `http://localhost:3001/auth/getAddress`,
    headers: {
      "x-auth-token": token,
    },
  }).then((response) => response.data);
});

export const addAddress = createAsyncThunk("address", async (values) => {
  return await axios({
    method: "post",
    url: `http://localhost:3001/auth/addAddress`,
    headers: {
      "x-auth-token": token,
    },
    data: values,
  }).then((response) => response.data);
});

export const deleteAddress = createAsyncThunk("address", async (_id) => {
  return await axios({
    method: "delete",
    url: `http://localhost:3001/auth/deleteAddress/${_id}`,
    headers: {
      "x-auth-token": token,
    },
  }).then((response) => response.data);
});

export const updateAddress = createAsyncThunk(
  "address",
  async ({ values, _id }) => {
    
    return await axios({
      method: "post",
      url: `http://localhost:3001/auth/updateAddress/${_id}`,
      headers: {
        "x-auth-token": token,
      },
      data: values,
    }).then((response)=>response.data);
  }
);

export const addressSlice = createSlice({
  name: "address",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchaddress.pending, (state, action) => {
      state.loading = "true";
    });
    builder.addCase(fetchaddress.fulfilled, (state, action) => {
      state.loading = "false";
      state.addresses = action.payload;
      state.error = "";
    });
    builder.addCase(fetchaddress.rejected, (state, action) => {
      state.error = "couldn't fetch addrsss";
    });
  },
});

export default addressSlice.reducer;
