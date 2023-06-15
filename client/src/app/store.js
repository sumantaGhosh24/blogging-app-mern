import {configureStore} from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import blogReducer from "../features/blog/blogSlice";
import categoryReducer from "../features/category/categorySlice";
import commentReducer from "../features/comment/commentSlice";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    blog: blogReducer,
    category: categoryReducer,
    comment: commentReducer,
    user: userReducer,
  },
});
