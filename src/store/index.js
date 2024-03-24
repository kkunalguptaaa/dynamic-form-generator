import { configureStore } from "@reduxjs/toolkit";

import formListSlice from "./reducer/formListSlice";

export const store = configureStore({
  reducer: {
    formList: formListSlice,
  },
});
