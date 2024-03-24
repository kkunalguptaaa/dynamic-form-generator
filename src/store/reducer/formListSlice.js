import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formList: [],
};

export const formListSlice = createSlice({
  name: "formList",
  initialState,
  reducers: {
    addForm: (state, action) => {
      state.formList.push(action.payload);
    },
  },
});

export const { addForm } = formListSlice.actions;
export default formListSlice.reducer;
