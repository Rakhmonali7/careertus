import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  registerRole: "applicant",
  templateStatus: 0,
  shared: {
    accountId: "",
    email: "",
    password: "",
    confirmPw: "",
    name: "",
    phone: null,
    type: "applicant",
  },
  applicant: {
    nationality: "",
    gender: "",
    location: "",
    birthdate: "",
    language: "",
    education: "",
  },
  company: {
    company_name: "",
    industry: "",
    website: "",
    description: "",
  },
};

const globalSlice = createSlice({
  name: "globalState",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    setAuthData: (state, action) => {
      const { user, key, value } = action.payload;
      state[user][key] = value;
    },
    setUserRole: (state, action) => {
      state.registerRole = action.payload;
    },
    setTemplateStatus: (state, action) => {
      state.templateStatus = action.payload;
    },
    resetAuthData: (state, action) => {
      const { user } = action.payload;
      state[user] = initialState[user];
      state.templateStatus = 0;
    },
  },
});

export const {
  setIsLoggedIn,
  setUserRole,
  setTemplateStatus,
  setAuthData,
  resetAuthData,
} = globalSlice.actions;
export default globalSlice.reducer;
