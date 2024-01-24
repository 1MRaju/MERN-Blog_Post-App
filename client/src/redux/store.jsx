import { createSlice, configureStore } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin : false,
    userBlogs: false,
  },
  reducers: {
    login(state){
      state.isLogin = true;
    },
    logout(state){
      state.isLogin = false;
    },
    setUserBlogs(state) {
      state.userBlogs = true;
    },
    reSetUserBlogs(state) {
      state.userBlogs = false;
    },
  }
})

export const authActions = authSlice.actions

export const store = configureStore({
  reducer: authSlice.reducer,
})
