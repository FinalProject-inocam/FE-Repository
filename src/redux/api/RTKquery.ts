import { createApi } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import { AxiosRequestConfig } from "axios";
import { instance, instanceLogout } from "./instanse";
import * as Type from "../../types";

const axiosBaseQuery =
	(): BaseQueryFn<{
		url: string;
		method: AxiosRequestConfig["method"];
		data?: AxiosRequestConfig["data"];
		types?: string;
	}> =>
	async ({ url, method, data, types }) => {
		try {
			switch (types) {
				case "login":
					const auth = await instance({ url, method, data });
					return { data: auth.data.msg };
				case "signup":
					const signup = await instance({ url, method, data });
					console.log(signup);
					return { data: signup.data.msg };
				case "logout":
					const logout = await instanceLogout({ url, method, data });
					return { data: logout.data.msg };
				case "getCheck":
					const getCheck = await instance({ url, method });
					console.log(getCheck);
					return { data: getCheck.data.msg };
				case "multipart":
					const postMultipart = await instance({
						url,
						method,
						data,
						headers: {
							"Content-Type": "multipart/form-data",
						},
					});
					return { data: postMultipart.data };
				case "getData":
					const getData = await instance({ url, method });
					// console.log(getData.data);
					return { data: getData.data.data };
				default:
					const res = await instance({ url, method, data });
					console.log(res);

					return { data: res.data.msg };
			}
		} catch (axiosError) {
			const err = axiosError as Type.CustomAxiosError<Type.ErrorType["data"]>; // 타입단언
			return {
				error: err.response?.data.msg,
			};
		}
	};

export const inocamRTK = createApi({
	baseQuery: axiosBaseQuery(),
	tagTypes: [
		"POSTS",
		"POSTSLIST",
		"POSTDETAIL",
		"POSTCOMMENT",
		"KAKAO",
		"ICOCAR",
		"PURCHASESCHAR",
		"WRAPPINGSHOP",
		"WRAPPINGSHOPDREVIEW",
		"WRAPPINGSHOPCOMMENT",
		"WRAPPINGSHOPD",
		"MYPAGE",
		"PURCHASESCHARTY",
	],
	endpoints(build) {
		return {
			/* / 01 Auth / -------------------------------------------------------- */
			// loginRTK
			postLogin: build.mutation({
				query: (data) => ({
					url: "/api/auth/login",
					method: "post",
					data,
					types: "login",
				}),
			}),
			// getLogout
			getLogout: build.query({
				query: () => ({
					url: `/api/auth/logout`,
					method: "get",
					types: "logout",
				}),
			}),
			// SNSLogin - kakao, google, naver
			loginSNSRTK: build.query({
				query: ({ types, code }) => ({
					url: `/api/auth/login/${types}${code}`,
					method: "get",
				}),
			}),
			// Signup
			postSignup: build.mutation({
				query: (data) => ({
					url: "/api/auth/signup",
					method: "post",
					data,
					types: "signup",
				}),
			}),
			// getEmailCheck
			getEmailCheck: build.query({
				query: (email) => ({
					url: `/api/auth/email?email=${email}`,
					method: "get",
					types: "getCheck",
				}),
			}),
			// getNickNameCheck
			getNickCheck: build.query({
				query: (nickname) => ({
					url: `/api/auth/nickname?nickname=${nickname}`,
					method: "get",
					types: "getCheck",
				}),
			}),
			// getCertificateCheck
			getCertificateEmail: build.query({
				query: (email) => ({
					url: `/api/auth/verify?email=${email}`,
					method: "get",
					types: "getCheck",
				}),
			}),
			// getCertificateCode
			getCertificateCode: build.query({
				query: ({ email, code }) => ({
					url: `/api/auth/checkcode?email=${email}&code=${code}`,
					method: "get",
					types: "getCheck",
				}),
			}),

			/* / 02 Purchases 관련(Innocar, MyPage, AdminPage) / -------------------------------------------------------- */
			// postPurchases - 차량신청 차량 출고 신청
			postPurchases: build.mutation({
				query: (data) => ({
					url: `/api/purchases`,
					method: "post",
					data,
				}),
				invalidatesTags: ["ICOCAR"],
			}),

			// getPurchases - 마이페이지 신청 차량 정보 조회
			getPurchases: build.query({
				query: () => ({
					url: `/api/purchases`,
					method: "get",
					types: "getData",
				}),
				providesTags: ["ICOCAR"],
			}),

			// deletePurchases - 마이 페이지 신청 차량 삭제
			deletePurchases: build.mutation({
				query: (purchaseId) => ({
					url: `/api/purchases/${purchaseId}`,
					method: "delete",
				}),
				invalidatesTags: ["ICOCAR"],
			}),

			// patchPurchases - 마이 페이지 신청 차량 정보 수정
			patchPurchases: build.mutation({
				query: ({ purchaseId, data }) => ({
					url: `/api/purchases/${purchaseId}`,
					method: "patch",
					data: data,
				}),
				invalidatesTags: ["ICOCAR"],
			}),
			// getPurchasesChar - 차량 통계 데이터
			getPurchasesChar: build.query({
				query: (term) => ({
					url: `/api/stat/purchases/chart?cal=2023-08-08&term=${term}`,
					method: "get",
					types: "getData",
				}),
				providesTags: ["PURCHASESCHAR"],
			}),

			/* / 03 Community 관련 / -------------------------------------------------------- */
			// getCommunity - 커뮤니티 게시글 요청
			getCommunity: build.query({
				query: ({getId, category}) => ({
					url: `/api/communities?category=${category}&page=${getId}&size=10`,
					method: "get",
					types: "getData",
				}),
				providesTags: ["POSTS"],
			}),

			// /api/communites/list
			getCommunitesList: build.query({
				query: () => ({
					url:`/api/communities/list`,
					method:"get",
					types: "getData",
				}),
				providesTags: ["POSTSLIST"],
			}),
			// postCommunity - 커뮤니티 게시글 작성
			postCommunity: build.mutation({
				query: (data) => ({
					url: `/api/communities`,
					method: "post",
					data,
					types: "multipart",
				}),
				invalidatesTags: ["POSTS"],
			}),

			// DeleteCommunity - 커뮤니티 게시글 삭제
			DeleteCommunity: build.mutation({
				query: (postId) => ({
					url: `/api/communities/${postId}`,
					method: "delete",
				}),
				invalidatesTags: ["POSTS"],
			}),

			// patchCommunity - 커뮤니티 게시글 수정
			patchCommunity: build.mutation({
				query: ({ post_id, formData }) => ({
					url: `/api/communities/${post_id}`,
					method: "patch",
					data: formData,
					types: "multipart",
				}),
				invalidatesTags: ["POSTS", "POSTDETAIL"],
			}),

			// patchCommunityLiked 게시글 좋아요
			patchCommunityLiked: build.mutation({
				query: ({ postId }) => ({
					url: `/api/communities/${postId}/like`,
					method: "patch",
				}),
				invalidatesTags: ["POSTS", "POSTDETAIL"],
			}),
			// getCommunityDetail - 커뮤니티 게시글 요청
			getCommunityDetail: build.query({
				query: (postId) => ({
					url: `/api/communities/${postId}`,
					method: "get",
					types: "getData",
				}),
				providesTags: ["POSTDETAIL"],
			}),

			// postCommunityComment - 커뮤니티 댓글 작성
			postCommunityComment: build.mutation({
				query: ({ post_id, data }) => ({
					url: `/api/communities/${post_id}/comments`,
					method: "post",
					data,
				}),
				invalidatesTags: ["POSTS", "POSTDETAIL"],
			}),

			// deleteCommunityComment - 커뮤니티 댓글 삭제
			deleteCommunityComment: build.mutation({
				query: ({ postId, commentId }) => ({
					url: `/api/communities/${postId}/comments/${commentId}`,
					method: "delete",
				}),
				invalidatesTags: ["POSTS", "POSTDETAIL"],
			}),

			// patchCommunityComment - 커뮤니티 댓글 수정
			patchCommunityComment: build.mutation({
				query: ({ postId, commentId, data }) => ({
					url: `/api/communities/${postId}/comments/${commentId}`,
					method: "patch",
					data: data,
				}),
				invalidatesTags: ["POSTS", "POSTDETAIL"],
			}),

			/* / 04 WrappingShop 관련 / -------------------------------------------------------- */
			// getWrappingShop - 랩핑샵 조회
			getWrapping: build.query({
				query: (geolocation) => ({
					url: `/api/shops?latitude=${geolocation.lat}&longitude=${geolocation.long}&page=1&size=10`,
					method: "get",
					types: "getData",
				}),
				providesTags: ["WRAPPINGSHOP"],
			}),

			// getWrappingShop - 랩핑샵 상세조회(info)
			getWrappingShopDetail: build.query({
				query: (shopId) => ({
					url: `/api/shops/${shopId}`,
					method: "get",
					types: "getData",
				}),
				providesTags: ["WRAPPINGSHOPD"],
			}),

			// getWrappingShop - 랩핑샵 리뷰 조회(re)
			getWSDetailReviews: build.query({
				query: ({ shopId, page }) => ({
					url: `/api/shops/${shopId}/reviews?page=${page}&size=10`,
					method: "get",
					types: "getData",
				}),
				providesTags: ["WRAPPINGSHOPDREVIEW"],
			}),

			// postWrappingShopComment - 래핑샵 댓글작성
			postWrappingComment: build.mutation({
				query: ({ shopId, formData }) => ({
					url: `/api/shops/${shopId}/reviews`,
					method: "post",
					data: formData,
					types: "multipart",
				}),
				invalidatesTags: ["WRAPPINGSHOPDREVIEW"],
			}),

			// DeleteWrappingShopComment - 래핑샵 댓글 삭제
			deleteWrappingComment: build.mutation({
				query: ({ shopId, reviewId }) => ({
					url: `/api/shops/${shopId}/reviews/${reviewId}`,
					method: "delete",
				}),
				invalidatesTags: ["WRAPPINGSHOPDREVIEW"],
			}),

			// pathWrappingShopComment - 랩핑샵 댓글 수정
			patchWrappingComment: build.mutation({
				query: ({ shopId, reviewId, formData }) => ({
					url: `/api/shops/${shopId}/reviews/${reviewId}`,
					method: "patch",
					data: formData,
					types: "multipart",
				}),
				invalidatesTags: ["WRAPPINGSHOPDREVIEW"],
			}),

			// pathWrappingShopComment - 랩핑샵 리뷰 좋아요
			patchWrappingShopDetailLike: build.mutation({
				query: ({ shopId, reviewId }) => ({
					url: `/api/shops/${shopId}/reviews/${reviewId}/like`,
					method: "patch",
				}),
				invalidatesTags: ["WRAPPINGSHOPDREVIEW"],
			}),
			/* / 04 WrappingShop 관련 / -------------------------------------------------------- */
			getMyPage: build.query({
				query: () => ({
					url: `/api/mypage`,
					method: "get",
					types: "getData",
				}),
				providesTags: ["MYPAGE"],
			}),

			patchMyPage: build.mutation({
				query: (formData) => ({
					url: `/api/mypage`,
					method: "patch",
					data: formData,
					types: "multipart",
				}),
				invalidatesTags: ["MYPAGE"],
			}),
			/* / 05 ADMINPAGE 관련 / -------------------------------------------------------- */
			getpurchasesChartY: build.query({
				query: (year) => ({
					url: `/api/admin/stats/purchases/year?cal=${year}`,
					method: "get",
					types: "getAdminData",
				}),
				providesTags: ["PURCHASESCHARTY"],
			}),
		};
	},
});

export const {
	// Auth
	useGetLogoutQuery,
	usePostLoginMutation,
	usePostSignupMutation,
	useGetEmailCheckQuery,
	useGetNickCheckQuery,
	useGetCertificateEmailQuery,
	useGetCertificateCodeQuery,
	useLoginSNSRTKQuery,

	// Community 차량출고 커뮤니티 관련
	useGetCommunityQuery,
	useGetCommunitesListQuery,
	usePostCommunityMutation,
	useDeleteCommunityMutation,
	usePatchCommunityMutation,
	useGetCommunityDetailQuery,

	// CommunityComment 차량출고 커뮤니티 댓글 관련
	usePostCommunityCommentMutation,
	usePatchCommunityCommentMutation,
	useDeleteCommunityCommentMutation,
	usePatchCommunityLikedMutation,

	// Posts 차량 신청 관련
	usePostPurchasesMutation,
	useGetPurchasesQuery,
	useDeletePurchasesMutation,
	usePatchPurchasesMutation,

	// Get 차량 통계 데이터 관련
	useGetPurchasesCharQuery,

	// WrappingShop 관련
	useGetWrappingQuery,
	useGetWrappingShopDetailQuery,
	useGetWSDetailReviewsQuery,
	usePostWrappingCommentMutation,
	useDeleteWrappingCommentMutation,
	usePatchWrappingCommentMutation,
	usePatchWrappingShopDetailLikeMutation,

	// MyPage 관련
	useGetMyPageQuery,
	usePatchMyPageMutation,
	// ADMIN
	useGetpurchasesChartYQuery,
} = inocamRTK;

/*
serializeQueryArgs: ({ endpointName }) => {
					// console.log("getWSDetailReviews-serializeQueryArgs", endpointName);
					return endpointName;
				},
				merge: (currentCache, newItems) => {
					// console.log("getWSDetailReviews-currentCache", currentCache.content, newItems.content);
					currentCache.first = newItems.first;
					currentCache.last = newItems.last;
					currentCache.number = newItems.number;
					currentCache.content.push(...newItems.content);
				},
				forceRefetch({ currentArg, previousArg }) {
					// console.log("getWSDetailReviews-forceRefetch", currentArg, previousArg);
					return currentArg !== previousArg;
				}
*/
/*
					serializeQueryArgs : 어떤 이유로 캐시키 생성을 변경해야하는 경우, 사용자 정의 기능을 허용
					merge : 들어오는 응답 값을 현 캐시 데이터에 병합하기 위해 사용, RTKQ는 일반적으로 캐시 항목을 새 응답으로 대체하기에, 기존 캐시 항목을 유지하려면, serializeQueryArgs + forceRefetch 를 사용해야한다.
				*/
