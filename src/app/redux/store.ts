"use client";
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slice/add";
export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
