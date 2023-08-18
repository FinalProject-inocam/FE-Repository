import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const validiteMsgSlice = createSlice({
  name: "validiteMsgSlice",
  initialState: {
    emailMsg: ["", false],
    nickNameMsg: ["", false],
    passwordMsg: ["", false],
    pwCheckedMsg: ["", false],
  } as any,
  reducers: {
    setValiditeMsg: (state, action: PayloadAction<any>) => {
      switch (action.payload.type) {
        case "email":
          return { ...state, emailMsg: action.payload.msg };
        case "nickname":
          return { ...state, nickNameMsg: action.payload.msg };
        default:
          return state;
      }
    },
    deleteValiditeMsg: () => {
      return {};
    },
  },
});

export const validiteMsgReducer = validiteMsgSlice.reducer;
export const selectValiditeEMsg = (state: any) => state.validiteMsgReducer.emailMsg;
export const selectValiditeNMsg = (state: any) => state.validiteMsgReducer.nickNameMsg;
export const selectValiditePMsg = (state: any) => state.validiteMsgReducer.passwordMsg;
export const selectValiditePWCMsg = (state: any) => state.validiteMsgReducer.pwCheckedMsg;
export const { setValiditeMsg, deleteValiditeMsg } = validiteMsgSlice.actions;
