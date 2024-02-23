import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  visible: false,
  studyDetails: null,
};

const notificationStudyDetailsSlice = createSlice({
  name: 'notificationStudyDetails',
  initialState,
  reducers: {
    showNotificationStudyDetails: (state, action) => {
      state.visible = true;
      state.studyDetails = action.payload;
    },
    closeNotificationStudyDetails: (state) => {
      state.visible = false;
      state.studyDetails = null;
    },
  },
});

export const { showNotificationStudyDetails, closeNotificationStudyDetails } = notificationStudyDetailsSlice.actions;

export default notificationStudyDetailsSlice.reducer;
