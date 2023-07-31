export type User = {
  email:string;
  password:string;
}

export type UserInfo = UserType & {
  nickname:string;
  phone_number: string;
  isAdmin:boolean;
  admincode: string;
}