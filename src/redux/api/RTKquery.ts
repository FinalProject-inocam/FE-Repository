import { createApi } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import { AxiosRequestConfig } from 'axios';
import instance from './instanse';
import * as Type from '../../types';


const axiosBaseQuery =
  (): BaseQueryFn<{
    url: string;
    method: AxiosRequestConfig['method']
    data?: AxiosRequestConfig['data'];
    types?: string;
  }
  > =>
    async ({ url, method, data, types }) => {
      try {
        switch (types) {
          case 'login':
            const auth = await instance({ url, method, data });
            console.log("auth.data", auth.data);
            return { data: auth.data.msg };
          case 'signup':
            const signup = await instance({ url, method, data });
            return { data: signup.data.msg };
          case 'getCheck':
            const getEmailCheck = await instance({ url, method });
            return { data: getEmailCheck.data.msg }; 
          default:
            const res = await instance({ url, method, data });
            return { data: res.data.info };
        }
      } catch (axiosError) {
        const err = axiosError as Type.CustomAxiosError<Type.ErrorType['data']>; // 타입단언
        return {
          error: err.response?.data.msg
        };
      }
    };

export const inocamRTK = createApi({
  baseQuery: axiosBaseQuery(),
  tagTypes: ['STORIES'],
  endpoints(build) {
    return {
      // loginRTK
      postLogin: build.mutation({
        query: (data) => ({
          url: '/api/auth/login',
          method: 'post',
          data,
          types: 'login',
        }),
      }),
      // Signup
      postSignup: build.mutation({
        query: (data) => ({
          url: '/api/auth/signup',
          method: 'post',
          data,
          types: 'signup',
        }),
      }),
      // getEmailCheck
      getEmailCheck: build.query({
        query: (email) => ({
          url: `/api/auth/email?email=${email}`,
          method: 'get',
          types: 'getCheck',
        }),
      }),
      // getNickNameCheck
      getNickCheck: build.query({
        query: (nickname) => ({
          url: `/api/auth/nickname?nickname=${nickname}`,
          method: 'get',
          types: 'getCheck',
        }),
      }),
    };
  },
});

export const {
  usePostLoginMutation,
  usePostSignupMutation,
  useGetEmailCheckQuery,
  useGetNickCheckQuery
} = inocamRTK;
