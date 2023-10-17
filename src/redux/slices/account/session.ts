import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import session from 'redux-persist/lib/storage/session';

export type Session = {
  id_token: string;
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  expire_unix: number;
};

const initialState: Session = {
  id_token: '',
  access_token: '',
  refresh_token: '',
  token_type: '',
  expires_in: 0,
  expire_unix: 0,
};

const sessionTokensSlice = createSlice({
  name: 'accountDetails',
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<Session>) => {
      state.access_token = action.payload.access_token;
      state.id_token = action.payload.id_token;
      state.refresh_token = action.payload.refresh_token;
      state.token_type = action.payload.token_type;
      state.expires_in = action.payload.expires_in;
      state.expire_unix = action.payload.expire_unix;
    },
  },
});

export const { setTokens } = sessionTokensSlice.actions;

export default sessionTokensSlice.reducer;
