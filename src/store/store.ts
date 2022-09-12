import {configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from './reducers/user-slice';

export const store = configureStore({
  reducer: {
    users: userReducer,
  }
});

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
