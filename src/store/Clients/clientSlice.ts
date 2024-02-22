// clientsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiService from '../../Services/Api/ApiService';

export const fetchClients = createAsyncThunk('clients/fetchClients', async () => {
  
  const response = await ApiService.getAllClients();
  return response;
});

export const fetchClientsStudies = createAsyncThunk('clients/fetchClientsStudies', async () => {
    
    const response = await ApiService.getClientsStudies();
    return response;
});

const clientsSlice = createSlice({
  name: 'clients',
  initialState: {
    clients: [],
    clientsStudies: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.clients = action.payload;
        state.loading = false;
      })
      .addCase(fetchClients.rejected, (state:any, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(fetchClientsStudies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClientsStudies.fulfilled, (state, action) => {
        state.clientsStudies = action.payload;
        state.loading = false;
      })
      .addCase(fetchClientsStudies.rejected, (state:any, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  }
});

export default clientsSlice.reducer;
