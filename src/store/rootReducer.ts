import { combineReducers } from '@reduxjs/toolkit';
import sidePanelReducer from './sidebar/sidePanelSlice';
import authSlice from './auth/authSlice';
import studySlice from './studies/studySlice';
import engineersSlice from './Engineers/engineersSlice';
import clientSlice from './Clients/clientSlice';
import studySidePanelSlice from './sidebar/studySidePanelSlice';
export const rootReducer = combineReducers({
  sidePanel: sidePanelReducer,
  auth:authSlice,
  studies:studySlice,
  client:clientSlice,
  engineer:engineersSlice,
  studySidePanel:studySidePanelSlice
  // other slice reducers will go here
});


export type RootState = ReturnType<typeof rootReducer>;