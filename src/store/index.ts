// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import {globalApiMiddleware} from "./globalApiMiddleware";
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(globalApiMiddleware),
});
