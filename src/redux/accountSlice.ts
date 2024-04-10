import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Account } from '../interfaces';

interface AccountState {
  accounts: Account[];
  isLoading: boolean;
  error: string | null;
}

const initialState: AccountState = {
  accounts: [],
  isLoading: false,
  error: null,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    depositAmount(state) {
      state.isLoading = true;
      state.error = null;
    },
    depositAmountSuccess(state, action: PayloadAction<Account>) {
      state.isLoading = false;
      state.accounts.push(action.payload);
    },
    depositAmountFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    withdrawAmount(state) {
      state.isLoading = true;
      state.error = null;
    },
    withdrawAmountSuccess(state, action: PayloadAction<number>) {
      state.isLoading = false;
      const index = action.payload;
      if (index >= 0 && index < state.accounts.length) {
        state.accounts.splice(index, 1);
      }
    },
    withdrawAmountFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteAccount(state) {
      state.isLoading = true;
      state.error = null;
    },
    deleteAccountSuccess(state, action: PayloadAction<number>) {
      state.isLoading = false;
      const index = action.payload;
      if (index >= 0 && index < state.accounts.length) {
        state.accounts.splice(index, 1);
      }
    },
    deleteAccountFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    createAccount(state) {
      state.isLoading = true;
      state.error = null;
    },
    createAccountSuccess(state, action: PayloadAction<Account>) {
      state.isLoading = false;
      state.accounts.push(action.payload);
    },
    createAccountFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  depositAmount,
  depositAmountSuccess,
  depositAmountFailure,
  withdrawAmount,
  withdrawAmountSuccess,
  withdrawAmountFailure,
  deleteAccount,
  deleteAccountSuccess,
  deleteAccountFailure,
  createAccount,
  createAccountSuccess,
  createAccountFailure,
} = accountSlice.actions;

export default accountSlice.reducer;
