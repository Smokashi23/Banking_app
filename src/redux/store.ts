import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'
import accountReducer from './accountSlice';


const store = configureStore({
  reducer: {
    user: userReducer,
    account: accountReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;