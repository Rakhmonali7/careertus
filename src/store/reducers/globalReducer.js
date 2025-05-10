import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  registerRole: "",
  templateStatus: 0,
  shared: {
    accountId: "",
    email: "",
    password: "",
    confirmPw: "",
    name: "",
    phone: null,
    type: "",
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
      state[action.user] = initialState[action.user];
      state.templateStatus = 0;
    },
  },
});

export const { setUserRole, setTemplateStatus, setAuthData, resetAuthData } =
  globalSlice.actions;
export default globalSlice.reducer;
