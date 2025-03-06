import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "./quizSlices";

export const store = configureStore({
  reducer: {
    quiz: quizReducer,
  },
});
