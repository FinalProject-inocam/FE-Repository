import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const chatMsgSlice = createSlice({
  name: 'chatMsg',
  initialState: [] as any[],
  reducers: {
    setChatMsg: (state, action: PayloadAction<any>) => { 
      console.log("...action.payload", ...action.payload)
      return [...state, ...action.payload]
    },
    deleteChatMsg: () => { 
      return []
    }
  },
});

export const ChatMsgReducer = chatMsgSlice.reducer;
export const selectchatMsg = (state: any) => state.ChatMsgReducer;
export const { setChatMsg, deleteChatMsg } = chatMsgSlice.actions;