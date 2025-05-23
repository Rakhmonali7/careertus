import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  registerRole: "",
  templateStatus: 0,
  shared: {
    user_uuid: "",
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
  job: {
    title: "",
    description: "",
    location: "",
    job_type: "",
    experience_lvl: "",
    wage_min: "",
    wage_max: "",
    rate: "per year",
    currency: "USD",
    company_id: "",
    resume_required: true,
    allow_email_contact: true,
    encourage_criminal_record: false,
    require_background_check: false,
  },
  jobs: [],
};

const globalSlice = createSlice({
  name: "globalState",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    setJobData: (state, action) => {
      const { key, value } = action.payload;
      state.job[key] = value;
    },
    setFetchedJobs: (state, action) => {
      state.jobs = action.payload;
    },
    resetFetchedJobs: (state) => {
      state.jobs = [];
    },
    setAuthData: (state, action) => {
      const { user, key, value } = action.payload;
      state[user][key] = value;
    },
    setAuthDataBulk: (state, action) => {
      const { user, data } = action.payload;
      for (let [key, value] of Object.entries(data)) {
        if (!state[user]) {
          console.log(`${state[user]} does not exist`);
          return;
        }
        state[user][key] = value;
      }
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
    resetJobData: (state) => {
      state.job = initialState.job;
    },
    handleLogout: (state) => {
      state.isLoggedIn = false;
      state.registerRole = initialState.registerRole;
      localStorage.removeItem("token");
    },
  },
});

export const {
  setIsLoggedIn,
  setUserRole,
  setTemplateStatus,
  setAuthData,
  resetAuthData,
  resetJobData,
  setAuthDataBulk,
  handleLogout,
  setJobData,
  setFetchedJobs,
  resetFetchedJobs,
} = globalSlice.actions;
export default globalSlice.reducer;
