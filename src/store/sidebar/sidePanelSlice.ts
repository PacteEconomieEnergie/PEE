// sidePanelSlice.js
import { createSlice } from '@reduxjs/toolkit';

const sidePanelSlice = createSlice({
  name: 'sidePanel',
  initialState: {
    visible: false,
    data: null,
    isEditing: false,
    isVisible:false
  },
  reducers: {
    showSidePanel: (state, action) => {
      state.visible = true;
      state.data = action.payload.data;
      state.isEditing = action.payload.isEditing;
    },
    closeSidePanel: (state) => {
      state.visible = false;
      state.data = null;
      state.isEditing = false;
    },
    startEditing: (state, action) => {
      state.isEditing = action.payload;
    },
    saveData: (state, action) => {
      // Update data in the state based on the action payload
    },
    toggleSidePanel:(state)=>{
      state.isVisible=!state.isVisible
    }
  },
});

export const { showSidePanel, closeSidePanel, startEditing, saveData,toggleSidePanel } = sidePanelSlice.actions;

export default sidePanelSlice.reducer;
