export type User = {
  email: string;
  password: string;
};

export type UserInfo = UserType & {
  nickname: string;
  phone_number: string;
  isAdmin: boolean;
  admincode: string;
};

export type UserInfoCheckPW = UserInfoType & {
  pwChecked: string;
};

export type ValiditeMsg = {
  validteEmail: [string, boolean];
  validtepassword: [string, boolean];
  passwordChMsg: [string, boolean];
};
