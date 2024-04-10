import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userApi } from "../hooks/useGetUserList";
import userReducer from "./userSlice";
import accountReducer from "./accountSlice";

const persistedState = localStorage.getItem("reduxState");
const initialState = persistedState ? JSON.parse(persistedState) : undefined;


const preloadedAuthState = initialState ? initialState.user : undefined;

const rootReducer = combineReducers({
  user: userReducer,
  account: accountReducer,
  [userApi.reducerPath]: userApi.reducer, 
});
const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    user: preloadedAuthState,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware), 
});


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


window.addEventListener("beforeunload", () => {
  console.log("addeventlistener: beforeunload");
  
  const userState = store.getState().user;
  const state = JSON.stringify({ auth: userState });
  localStorage.setItem("reduxState", state);
});


export const clearStoredState = () => {
  console.log("localstorage: ",localStorage.getItem("reduxState"));
  localStorage.removeItem("reduxState");
  console.log("localstrage: ",localStorage.getItem("reduxState"));
};

export default store;
