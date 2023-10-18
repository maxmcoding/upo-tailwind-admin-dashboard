import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';

export type Session = {
  id_token: string;
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  expire_unix: number;
  data_info?: SessionData;
};

export type SessionData = {
  sub: string;
  iss: string;
  version: number;
  client_id: string;
  origin_jti: string;
  event_id: string;
  token_use: 'access' | 'id' | 'refresh';
  scope: string;
  auth_time: number;
  exp: number;
  iat: number;
  jti: string;
  username: string;
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
      state.data_info =    jwtDecode<SessionData>(action.payload.access_token);
    },
  },
});

export const { setTokens } = sessionTokensSlice.actions;

export default sessionTokensSlice.reducer;
