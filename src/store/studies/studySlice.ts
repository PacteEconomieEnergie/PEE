import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import studyService from '../../Services/Api/Studies/StudiesService';
import { stat } from 'fs';

interface StudyState {
    studies: any[];
    userStudies: any[];
    studyStats: StudyStatistics;
    userStudyStats: StudyStatistics; // Replace 'any' with your Study type
    loading: boolean;
    error: string | null;
}


// Initial state for statistics

interface StudyStatistics {
    total: number;
    status: {
      Done: number;
      inProgress: number;
      toDo: number;
      ManqueInformation: number;
    };
    typeEtude: {
      NouvelleEtude: number;
      Retouche: number;
    };
    category: {
      Classique: number;
      Precaire: number;
      GrandPrecaire: number;
    };
    nature: {
      Normale: number;
      Prioritere: number;
    };
    retouche: {
        done: number;
        inProgress: number;
        toDo: number;
      };
  }


const initialStats: StudyStatistics = {
    total: 0,
    status: {
      Done: 0,
      inProgress: 0,
      toDo: 0,
      ManqueInformation: 0,
    },
    typeEtude: {
      NouvelleEtude: 0,
      Retouche: 0,
    },
    category: {
      Classique: 0,
      Precaire: 0,
      GrandPrecaire: 0,
    },
    nature: {
      Normale: 0,
      Prioritere: 0,
    },
    retouche: {
        done: 0,
        inProgress: 0,
        toDo: 0,
      },
  };
const initialState: StudyState = {
    studies: [],
    userStudies: [],
    studyStats: initialStats,
    userStudyStats: initialStats,
    loading: false,
    error: null,
};
// Async thunk actions
export const fetchAllStudies = createAsyncThunk(
    'study/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const response:any = await studyService.getAllStudies();
            const stats = calculateStatistics(response);
            console.log(stats);
            
            return { studies: response, stats };
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchStudiesByUserId = createAsyncThunk(
    'study/fetchByUserId',
    async (userId: number, { rejectWithValue }) => {
        try {
            const response:any = await studyService.getStudyByIdUser(userId);
            const userStats = calculateStatistics(response);
            return { userStudies: response, userStats };
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
            .addCase(fetchAllStudies.fulfilled, (state:any, action:any) => {
                // Assuming action.payload.studies is the array of studies
                // and action.payload.stats is the calculated statistics
                state.studies = action.payload.studies;
                state.studyStats = action.payload.stats;
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
        .addCase(fetchStudiesByUserId.fulfilled, (state:any, action:any) => {
            state.userStudies = action.payload.userStudies;
            state.userStudyStats = action.payload.userStats; // Update user-specific study statistics with the calculated stats
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


function calculateStatistics(studies: any[]): StudyStatistics {
    let stats: StudyStatistics = JSON.parse(JSON.stringify(initialStats)); // Deep copy to avoid mutation


    studies.forEach((study: any) => {
      console.log(study,"from the slice");
      
        stats.total += 1;

        // Safely increment status, ensuring the key exists
        if (study.Status in stats.status) {
            stats.status[study.Status as keyof typeof stats.status] += 1;
        }

        // Safely increment TypeEtude stats, ensuring the key exists
        if (study.TypeEtude in stats.typeEtude) {
            stats.typeEtude[study.TypeEtude as keyof typeof stats.typeEtude] += 1;
        }

        // Safely increment Category stats, ensuring the key exists
        if (study.Category in stats.category) {
            stats.category[study.Category as keyof typeof stats.category] += 1;
        }

        // Safely increment Nature stats, ensuring the key exists
        if (study.Nature in stats.nature) {
            stats.nature[study.Nature as keyof typeof stats.nature] += 1;
        }
        if (study.TypeEtude === "retouche") {
            switch (study.Status) {
              case "done":
                stats.retouche.done += 1;
                break;
              case "inProgress":
                stats.retouche.inProgress += 1;
                break;
              case "toDo":
                stats.retouche.toDo += 1;
                break;
              // Add other statuses if necessary
            }
          }
    });

    return stats;
}
  