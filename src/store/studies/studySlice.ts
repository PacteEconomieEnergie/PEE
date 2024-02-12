import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import studyService from '../../Services/Api/Studies/StudiesService';

interface StudyState {
    studies: any[];
    userStudies: any[]; // Replace 'any' with your Study type
    loading: boolean;
    error: string | null;
}

const initialState: StudyState = {
    studies: [],
    userStudies: [],
    loading: false,
    error: null,
};

// Async thunk actions
export const fetchAllStudies = createAsyncThunk(
    'study/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await studyService.getAllStudies();
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchStudiesByUserId = createAsyncThunk(
    'study/fetchByUserId',
    async (userId: number, { rejectWithValue }) => {
        try {
            const response = await studyService.getStudyByIdUser(userId);
            return response // Assuming the response is structured as { data: studies }
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Define the slice
const studySlice = createSlice({
    name: 'study',
    initialState,
    reducers: {
        // Define reducers for any non-async actions if needed
    },
    extraReducers: (builder:any) => {
        builder
            .addCase(fetchAllStudies.pending, (state:any) => {
                state.loading = true;
            })
            .addCase(fetchAllStudies.fulfilled, (state:any, action: PayloadAction<any[]>) => {
                state.studies = action.payload;
                state.loading = false;
            })
            .addCase(fetchAllStudies.rejected, (state:any, action:any) => {
                state.error = action.payload;
                state.loading = false;
            })
        // Handle fetchStudiesByUserId
        .addCase(fetchStudiesByUserId.pending, (state:any) => {
            state.loading = true;
        })
        .addCase(fetchStudiesByUserId.fulfilled, (state:any, action: PayloadAction<any[]>) => {
            state.userStudies = action.payload;
            state.loading = false;
        })
        .addCase(fetchStudiesByUserId.rejected, (state:any, action:any) => {
            state.error = action.payload;
            state.loading = false;
        });
    },
});

// Export actions and reducer
export const {} = studySlice.actions;
export default studySlice.reducer;
