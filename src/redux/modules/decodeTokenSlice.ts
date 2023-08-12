import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DecodeToken } from '../../types';
import jwtDecode from 'jwt-decode';

const decodeTokenSlice = createSlice({
  name: 'decodeToken',
  initialState: {} as DecodeToken,
  reducers: {
    setDecodeToken: (state, action: PayloadAction<any>) => { // DecodeToken
      const decode = jwtDecode(action.payload)
      console.log("setDecodeToken - state", state);
      console.log("setDecodeToken - decode", decode);
      
      return state
    },
    deleteDecodeToken: () => {
      return {} as DecodeToken;
    },
  },
});

export const decodeTokenReducer = decodeTokenSlice.reducer;
export const selectDecode = (state: any) => state.decodeTokenReducer;
export const { setDecodeToken, deleteDecodeToken } = decodeTokenSlice.actions;
