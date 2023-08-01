import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DecodeToken } from '../../types/async';

const decodeTokenSlice = createSlice({
  name: 'decodeToken',
  initialState: {} as DecodeToken,
  reducers: {
    setDecodeToken: (_, action: PayloadAction<DecodeToken>) => {
      return { ...action.payload };
    },
    deleteDecodeToken: () => {
      return {} as DecodeToken;
    },
  },
});

export const decodeTokenReducer = decodeTokenSlice.reducer;
export const selectDecode = (state: any) => state.decodeTokenReducer;
export const { setDecodeToken, deleteDecodeToken } = decodeTokenSlice.actions;
