import { combineReducers } from '@reduxjs/toolkit';
import sidePanelReducer from './sidebar/sidePanelSlice';

export const rootReducer = combineReducers({
  sidePanel: sidePanelReducer,
  // other slice reducers will go here
});
