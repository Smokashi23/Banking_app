import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import { User, LoginData } from '../interfaces';



interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: null,
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
        role: 'Customer',
      };
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