import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DecodeToken } from '../reduxType';

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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const selectDecode = (state: any) => state.decodeTokenReducer;
export const { setDecodeToken, deleteDecodeToken } = decodeTokenSlice.actions;
