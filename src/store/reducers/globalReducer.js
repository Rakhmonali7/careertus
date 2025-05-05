import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  registerRole: "",
  templateStatus: 0,
  signUpData: {
    email: "",
    password: "",
    confirmPw: "",
    nationality: "",
    gender: "",
    location: "",
    birthday: "",
  },
};

const globalSlice = createSlice({
  name: "globalState",
  initialState,
  reducers: {
    setUserRole: (state, action) => {
      state.registerRole = action.payload;
    },
    setTemplateStatus: (state, action) => {
      state.templateStatus = action.payload;
    },
    setSignUpData: (state, action) => {
      const { key, value } = action.payload;
      state.signUpData[key] = value;
    },
    resetSignUpData: (state) => {
      state.signUpData = initialState.signUpData;
      state.templateStatus = 0;
    },
  },
});

export const {
  setUserRole,
  setTemplateStatus,
  setSignUpData,
  resetSignUpData,
} = globalSlice.actions;
export default globalSlice.reducer;
