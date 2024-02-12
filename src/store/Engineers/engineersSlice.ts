// engineersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiService from '../../Services/Api/ApiService';

export const fetchEngineers = createAsyncThunk('engineers/fetchEngineers', async () => {
    try {
        const response = await ApiService.getAllEngineers();
        // Debug log
        return response;
      } catch (error) {
        console.error("Error fetching engineers:", error);
        throw error;
      }
});

const engineersSlice = createSlice({
  name: 'engineers',
  initialState: {
    engineers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEngineers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEngineers.fulfilled, (state, action) => {
        state.engineers = action.payload;
        state.loading = false;
      })
      .addCase(fetchEngineers.rejected, (state:any, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default engineersSlice.reducer;
