import { configureStore } from '@reduxjs/toolkit';
import accountDetailsReducer from '../slices/account/info';

export const store = configureStore({
  reducer: {
    accountDetailsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
