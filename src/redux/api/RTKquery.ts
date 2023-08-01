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
            console.log("auth.data", auth);
            return { data: auth.data.msg };
          case 'signup':
            const signup = await instance({ url, method, data });
            return { data: signup.data.msg };
          case 'getCheck':
            const getEmailCheck = await instance({ url, method });
            return { data: getEmailCheck.data.msg };
          case 'multipart':
            const postMultipart = await instance({
              url, method, data,
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
            return { data: postMultipart.data };
          case 'getData':
            const getData = await instance({ url, method });
            return { data: getData.data.data };
          default:
            const res = await instance({ url, method, data });
            return { data: res.data.msg };
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
  tagTypes: ['POSTS', 'POSTDETAIL', 'POSTCOMMENT'],
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

      // getPosts - 차량출고 커뮤니티
      getPosts: build.query({
        query: () => ({
          url: `/api/posts`,
          method: 'get',
          types: 'getData',
        }),
        providesTags: ['POSTS']
      }),

      // postPosts - 차량출고 커뮤니티
      postPosts: build.mutation({
        query: (data) => ({
          url: `/api/posts`,
          method: 'post',
          data,
          types: 'multipart',
        }),
        invalidatesTags: ['POSTS']
      }),

      // DeletePosts - 차량출고 커뮤니티 게시글 삭제
      DeletePosts: build.mutation({
        query: (postId) => ({
          url: `/api/posts/${postId}`,
          method: 'delete',
        }),
        invalidatesTags: ['POSTS']
      }),

      // EditPosts - 차량출고 커뮤니티 게시글 수정
      patchPosts: build.mutation({
        query: ({postId, formData}) => ({
        url: `/api/posts/${postId}`,
        method: 'patch',
        data:formData,
        types:'multipart'
      }),
      invalidatesTags: ['POSTS', "POSTDETAIL"]
      }),


      // getPostsDetail - 차량출고 커뮤니티 게시글
      getPostsDetail: build.query({
        query: (postId) => ({
          url: `/api/posts/${postId}`,
          method: 'get',
          types: 'getData',
        }),
        providesTags: ['POSTDETAIL']
      }),

      // postComment - 차량출고 커뮤니티 댓글작성
      postPostsComment: build.mutation({
        query: ({post_id, data}) => ({
          url: `/api/posts/${post_id}/comments`,
          method: 'post',
          data
        }),
        invalidatesTags: ['POSTS','POSTDETAIL']
      }),


      // DeleteComment - 차량출고 커뮤니티 댓글 삭제
      deletePostsComment: build.mutation({
        query: ({post_id, comment_id}) => ({
          url: `/api/posts/${post_id}/comments/${comment_id}`,
          method: 'delete',
        }),
        invalidatesTags: ['POSTS','POSTDETAIL']
      }),

      // pathComment - 차량출고 커뮤니티 댓글수정
      patchPostComment: build.mutation({
        query: ({post_id, comment_id, data}) => ({
          url: `/api/posts/${post_id}/comments/${comment_id}`,
          method: 'patch',
          data: data,
        }),
        invalidatesTags: ['POSTS','POSTDETAIL']
      }),



    };
  },
});

export const {
  // Auth
  usePostLoginMutation,
  usePostSignupMutation,
  useGetEmailCheckQuery,
  useGetNickCheckQuery,

  // Posts 차량출고 커뮤니티 관련
  useGetPostsQuery,
  usePostPostsMutation,
  useDeletePostsMutation,
  usePatchPostsMutation,
  useGetPostsDetailQuery,

  // Posts 차량출고 커뮤니티 댓글 관련
  usePostPostsCommentMutation,
  usePatchPostCommentMutation,
  useDeletePostsCommentMutation
} = inocamRTK;
