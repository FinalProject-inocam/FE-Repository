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
export const selectValiditeMsg = (state: any) => state.validiteMsgReducer;
export const { setValiditeMsg, deleteValiditeMsg } = validiteMsgSlice.actions;
