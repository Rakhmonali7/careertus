import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  registerRole: "company",
  templateStatus: 0,
  shared: {
    accountId: "",
    email: "",
    password: "",
    confirmPw: "",
    name: "",
    phone: null,
    type: "company",
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
      const { user } = action.payload;
      state[user] = initialState[user];
      state.templateStatus = 0;
    },
  },
});

export const { setUserRole, setTemplateStatus, setAuthData, resetAuthData } =
  globalSlice.actions;
export default globalSlice.reducer;
