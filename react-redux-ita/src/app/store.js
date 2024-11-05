import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import { linksReducer } from "../features/links/LinksSlice";

export const store = configureStore({
  reducer: {
    links: linksReducer,
  },
});
