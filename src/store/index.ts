// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import {globalApiMiddleware} from "./globalApiMiddleware";
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(globalApiMiddleware),
  devTools: {
    stateSanitizer: (state) => ({
      ...state,
      // studies: '<<OMITTED>>', // Replace 'studies' with a placeholder
      // Include other parts of the state as needed
    }), // Adjust based on what you want to sanitize
  },
});




export type AppDispatch = typeof store.dispatch;