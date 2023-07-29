import { createApi } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import { AxiosError, AxiosRequestConfig } from 'axios';
import instance from './instanse';

export interface ErrorType {
  status: number | undefined;
  data: any;
}


const axiosBaseQuery =
  (): BaseQueryFn<{
    url: string;
    method: AxiosRequestConfig['method']
    data?: AxiosRequestConfig['data'];
    types?: string;
  }> =>
    async ({ url, method, data, types }) => {
      try {
        switch (types) {

          case 'login':
            const auth = await instance({ url, method, data });
            console.log('auth', auth);
            return { data: auth.data };
          default:
            const res = await instance({ url, method });
            return { data: res.data };
        }
      } catch (axiosError) {
        const err = axiosError as AxiosError; // 타입단언
        return {
          error: {
            status: err.response?.status,
            data: err.response?.data || err.message,
          },
        };
      }
    };

export const testApi = createApi({
  baseQuery: axiosBaseQuery(),
  tagTypes: ['STORIES'],
  endpoints(build) {
    return {
      postLogin: build.mutation({
        query: (data) => ({
          url: '/api/auth/login',
          method: 'post',
          data,
          types: 'login',
        }),
      }),
      getStoriesRTK: build.query({
        query: () => ({
          url: 'api/stories?page=1&size=20',
          method: 'get',
        }),
        providesTags: ['STORIES'],
      }),
    };
  },
});

export const { usePostLoginMutation, useGetStoriesRTKQuery } = testApi;
