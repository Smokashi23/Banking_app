import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, LoginData } from '../interfaces';

  interface UserState {
    user: User | null;
    isAuthenticated: boolean; 
    isLoading: boolean;
    error: string | null;
    user_id: string| null;
  }

const initialState: UserState = {
  user: null,
  isAuthenticated: false, 
  isLoading: false,
  error: null,
  user_id: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signUpUserRequest: (state: UserState) => {
      state.isLoading = true;
      state.error = null;
    },
    signUpUserSuccess: (state: UserState, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    signUpUserFailure: (state: UserState, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    loginUserRequest: (state: UserState) => {
      state.isLoading = true;
      state.error = null;
    },
    loginUserSuccess: (state: UserState, action: PayloadAction<LoginData>) => {
      state.isLoading = false;
      state.user = {
        name: '',
        mobile: '',
        email: action.payload.username,
        password: '',
        address: '',
        role: 'Admin',
        user_id:'',
      };
      state.isAuthenticated = true; 
    },
    loginUserFailure: (state: UserState, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateUser: (state: UserState, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logoutUser: (state: UserState) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const {
  signUpUserRequest,
  signUpUserSuccess,
  signUpUserFailure,
  loginUserRequest,
  loginUserSuccess,
  loginUserFailure,
  updateUser,
  logoutUser,
} = userSlice.actions;
export default userSlice.reducer;
