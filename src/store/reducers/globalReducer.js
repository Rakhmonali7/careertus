import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  registerRole: "",
  templateStatus: 0,
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
  },
});

export const { setUserRole, setTemplateStatus } = globalSlice.actions;
export default globalSlice.reducer;
