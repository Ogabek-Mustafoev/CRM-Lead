import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  user: {},
  isRememberMe: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.isAuth = true;
      state.user = action.payload;
    },
    logOut: (state) => {
      state.isAuth = false;
      state.user = {};
    },
    setIsRememberMe: (state, action) => {
      state.isRememberMe = action.payload;
    },
  },
});

export const {logIn, logOut, setIsRememberMe} =
  authSlice.actions;
export default authSlice.reducer;
