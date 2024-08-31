import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  list: [],
  isLoading: false,
  totalPages: 0,
};

export const addBook = createAsyncThunk(
  "book/create",
  async (requestedData) => {
    const res = await axios.post(`book/add`, requestedData);
    const data = await res.data;
    return data;
  }
);

export const getBook = createAsyncThunk("book/list", async (pagination) => {
  const res = await axios.get(`book/list`, { params: pagination });
  const data = await res.data;
  return data;
});

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addBook.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addBook.fulfilled, (state, action) => {
      state.isLoading = false;
      // if (!Array.isArray(state.list)) {
      //   state.list = [action.payload.book];
      // } else {
      //   state.list.unshift(action.payload.book);
      // }
    });
    builder.addCase(addBook.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(getBook.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getBook.fulfilled, (state, action) => {
      state.isLoading = false;
      state.list = action.payload.books;
      state.totalPages = action.payload.totalPages;
    });
    builder.addCase(getBook.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default bookSlice.reducer;
