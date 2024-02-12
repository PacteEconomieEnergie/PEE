// src/features/auth/authSlice.js
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setAuthInfo, clearAuthInfo, getAuthInfo } from '../../utils/storage/tokenUtils';
import { jwtDecode } from "jwt-decode"

interface UserState {
  id: string | null;
  Email: string | null;
  role: string | null;
  token: string | null;
  isAuthenticated: boolean;
}
interface MyTokenPayload {
    userId: string;
    Email: string;
    role: string;
    // ... any other fields you expect in your JWT payload
}
const initialState: UserState = getAuthInfo().token
  ? { ...getAuthInfo(), isAuthenticated: true }
  : {  
      id: null,
      Email: null,
      role: null,  
      token: null,
      isAuthenticated: false,
    };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ token: string }>) {
        const { token } = action.payload;
        const decoded = jwtDecode<MyTokenPayload>(token);
        const { userId, Email, role } = decoded;
        
        
      setAuthInfo({ token, userId, Email, role });  
      state.token = token;
      state.id = userId;
      state.Email = Email;
      state.role = role;
      state.isAuthenticated = true;
    },
    logout(state) {
      clearAuthInfo();
      state.id = null;
      state.Email = null;
      state.role = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    // Additional reducers as needed
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
