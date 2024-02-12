import { createSlice } from '@reduxjs/toolkit';

const studySidePanelSlice = createSlice({
  name: 'studySidePanel',
  initialState: {
    visible: false,
    studyData: null,
  },
  reducers: {
    showStudySidePanel: (state, action) => {
      state.visible = true;
      state.studyData = action.payload;
    },
    closeStudySidePanel: (state) => {
      state.visible = false;
      state.studyData = null;
    },
  },
});

export const { showStudySidePanel, closeStudySidePanel } = studySidePanelSlice.actions;

export default studySidePanelSlice.reducer;
