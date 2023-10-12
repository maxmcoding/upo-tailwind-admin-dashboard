import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AccountDetailsState {
    name: string;
    email: string;
    phone: string;
    address: string;
}

const initialState: AccountDetailsState = {
    name: '',
    email: '',
    phone: '',
    address: '',
};

const accountDetailsSlice = createSlice({
    name: 'accountDetails',
    initialState,
    reducers: {
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setPhone: (state, action: PayloadAction<string>) => {
            state.phone = action.payload;
        },
        setAddress: (state, action: PayloadAction<string>) => {
            state.address = action.payload;
        },
    },
});

export const { setName, setEmail, setPhone, setAddress } = accountDetailsSlice.actions;

export default accountDetailsSlice.reducer;
