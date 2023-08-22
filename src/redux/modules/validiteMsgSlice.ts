import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  emailMsg: ["", false],
  nickNameMsg: ["", false],
  passwordMsg: ["", false],
  pwCheckedMsg: ["", false],
  emailCheckedMsg: ["", false],
};

const validiteMsgSlice = createSlice({
  name: "validiteMsgSlice",
  initialState,
  reducers: {
    setValiditeMsg: (state, action: PayloadAction<any>) => {
      switch (action.payload.type) {
        case "email":
          return { ...state, emailMsg: action.payload.msg };
        case "nickname":
          return { ...state, nickNameMsg: action.payload.msg };
        case "password":
          return { ...state, passwordMsg: action.payload.msg };
        case "pwChecked":
          return { ...state, pwCheckedMsg: action.payload.msg };
        case "emailCheckedMsg":
          return { ...state, emailCheckedMsg: action.payload.msg };
        default:
          return;
      }
    },
    deleteValiditeMsg: () => {
      return initialState;
    },
  },
});

export const validiteMsgReducer = validiteMsgSlice.reducer;
export const selectValiditeEMsg = (state: any) =>
  state.validiteMsgReducer.emailMsg;
export const selectValiditeNMsg = (state: any) =>
  state.validiteMsgReducer.nickNameMsg;
export const selectValiditePMsg = (state: any) =>
  state.validiteMsgReducer.passwordMsg;
export const selectValiditePWCMsg = (state: any) =>
  state.validiteMsgReducer.pwCheckedMsg;
export const selectValiditeECMsg = (state: any) =>
  state.validiteMsgReducer.emailCheckedMsg;

export const { setValiditeMsg, deleteValiditeMsg } = validiteMsgSlice.actions;
