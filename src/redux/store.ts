import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userApi } from "../hooks/useGetUserList"; // Correct import path for userApi slice
import userReducer from "./userSlice";
import accountReducer from "./accountSlice";

const persistedState = localStorage.getItem("reduxState");
const initialState = persistedState ? JSON.parse(persistedState) : undefined;

// Extract the preloaded state for the auth reducer
const preloadedAuthState = initialState ? initialState.user : undefined;

const rootReducer = combineReducers({
  user: userReducer,
  account: accountReducer,
  [userApi.reducerPath]: userApi.reducer, // Add RTK-Query reducer under its specified reducerPath
});
const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    user: preloadedAuthState,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware), // Add RTK-Query middleware
});

// Setup listeners to automatically handle lifecycle events
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

store.subscribe(() => {
  // debugger;
  console.log("subscribe: ");
  
  const userState = store.getState().user;
  const state = JSON.stringify({ user: userState });
  localStorage.setItem("reduxState", state);
});

// Add event listener to save auth state to local storage before page unload
window.addEventListener("beforeunload", () => {
  console.log("addeventlistener: beforeunload");
  
  const userState = store.getState().user;
  const state = JSON.stringify({ auth: userState });
  localStorage.setItem("reduxState", state);
});

// Function to clear stored state
export const clearStoredState = () => {
  console.log("localstorage: ",localStorage.getItem("reduxState"));
  localStorage.removeItem("reduxState");
  console.log("localstrage: ",localStorage.getItem("reduxState"));
};

export default store;
