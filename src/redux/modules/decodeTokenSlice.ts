import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DecodeToken } from '../../types';
import jwtDecode from 'jwt-decode';

const decodeTokenSlice = createSlice({
  name: 'decodeToken',
  initialState: {} as DecodeToken | {},
  reducers: {
    setDecodeToken: (state, action: PayloadAction<any>) => { 
      const decode = jwtDecode(action.payload)
      return decode ? decode : state
    },
    deleteToken : () => {
      return {}
    }

  },
});

export const decodeTokenReducer = decodeTokenSlice.reducer;
export const selectDecode = (state: any) => state.decodeTokenReducer;
export const { setDecodeToken, deleteToken  } = decodeTokenSlice.actions;