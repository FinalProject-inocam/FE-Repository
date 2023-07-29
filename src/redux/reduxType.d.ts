// React-Redux를 위한 타입지정
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// decodeTokenSlice를 위한 타입지정
export interface DecodeToken {
  sub: string;
  auth: string;
  nickname: string;
  gender: string;
  exp: number;
  iat: number;
}
