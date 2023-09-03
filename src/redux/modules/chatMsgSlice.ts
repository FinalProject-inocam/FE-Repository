import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const chatMsgSlice = createSlice({
  name: 'chatMsg',
  initialState: [] as any[],
  reducers: {
    setChatMsg: (state, action: PayloadAction<any>) => { 
      return [...state, ...action.payload]
    },
    deleteChatMsg: () => { 
      console.log("deleteChatMsg 동작해야지")
      return []
    }
  },
});

export const ChatMsgReducer = chatMsgSlice.reducer;
export const selectchatMsg = (state: any) => state.ChatMsgReducer;
export const { setChatMsg, deleteChatMsg } = chatMsgSlice.actions;