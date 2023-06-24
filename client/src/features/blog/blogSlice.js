import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

import blogService from "./blogService";

const initialState = {
  blogs: [],
  searchBlogs: [],
  homeBlogs: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createBlog = createAsyncThunk(
  "blog/create",
  async (blogData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken;
      return await blogService.createBlog(blogData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getHomeBlogs = createAsyncThunk(
  "blog/getHomeBlogs",
  async (_, thunkAPI) => {
    try {
      return await blogService.getHomeBlogs();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getBlogsByCategory = createAsyncThunk(
  "blog/getBlogsByCategory",
  async (data, thunkAPI) => {
    try {
      return await blogService.getBlogsByCategory(data.id, data.search);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getBlogsByUser = createAsyncThunk(
  "blog/getBlogsByUser",
  async (data, thunkAPI) => {
    try {
      return await blogService.getBlogsByUser(data.id, data.search);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getBlog = createAsyncThunk(
  "blog/getBlog",
  async (id, thunkAPI) => {
    try {
      return await blogService.getBlog(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateBlog = createAsyncThunk(
  "blog/update",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken;
      return await blogService.updateBlog(data.id, data, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "blog/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken;
      return await blogService.deleteBlog(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const searchBlog = createAsyncThunk(
  "blog/searchBlog",
  async (search, thunkAPI) => {
    try {
      return await blogService.searchBlog(search);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getHomeBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getHomeBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.homeBlogs = action.payload;
      })
      .addCase(getBlogsByCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogsByCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blogs = action.payload;
      })
      .addCase(getBlogsByCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getBlogsByUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogsByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blogs = action.payload;
      })
      .addCase(getBlogsByUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blogs = action.payload;
      })
      .addCase(getBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(searchBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchBlogs = action.payload;
      });
  },
});

export const {reset} = blogSlice.actions;
export default blogSlice.reducer;
