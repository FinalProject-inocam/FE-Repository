import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import * as RTK from "../../redux";
import { useRouter } from "../useRouter";
import { useDebounce } from "../commen";

export const useCommunityDetail = ({ setPage }: { setPage: any }): any => {
	// Type.UseCommunityDetail
	const { onNavigate, getId, pathname, state } = useRouter();
	const [onPatchLiked] = RTK.usePatchCommunityLikedMutation();
	const { nickname: decokenNickname } = RTK.useAppSelector(RTK.selectDecode);

	// RTK - 상세페이지 GET
	const { isLoading, data, isError, error } = RTK.useGetCommunityDetailQuery(getId);

	// RTK - 상세페이지 삭제
	const [
		onDeletePostRTK,
		// {
		//   isSuccess: postSuccess,
		//   data: postData,
		//   isError: postIsError,
		//   error: postError,
		// },
	] = RTK.useDeleteCommunityMutation();

	const onDeletePost = (postId: number | undefined) => () => {
		onDeletePostRTK(postId);
		onNavigate({ url: -1 })();
	};

	// RTK - 상세페이지 댓글작성(POST)
	const [commentInfo, setCommentInfo] = useState<string>("");
	const [
		onCommentPostRTK,
		// {
		//   isSuccess: commentSuccess,
		//   data: commentData,
		//   isError: commentIsError,
		//   error: commentError,
		// },
	] = RTK.usePostCommunityCommentMutation();
	const onChangeComment = (e: ChangeEvent<HTMLTextAreaElement>): void => {
		setCommentInfo(e.target.value);
	};
	const onSubmitPostComment =
		(post_id: number | undefined) =>
		(e: MouseEvent<HTMLDivElement>): void => {
			e.preventDefault();
			if (!!decokenNickname === false) {
				if (window.confirm("로그인 후 이동 가능합니다. 로그인 하시겠습니까?"))
					onNavigate({ url: "/login", opts: { state: pathname } })();
				else commentInfo && setCommentInfo("");
				return;
			}
			if (!!commentInfo === false) return;
			onCommentPostRTK({ post_id, data: { comment: commentInfo } });
			setCommentInfo("");
			setPage(1); // 댓글 작성시에는 페이지 초기화
		};

	// RTK - 상세페페이지 댓글삭제(DELETE)
	const [
		onDeleteCommentRTK,
		// {
		//   isSuccess: commentDeleteSuccess,
		//   data: commentDeleteData,
		//   isError: commentDeleteIsError,
		//   error: commentDeleteError,
		// },
	] = RTK.useDeleteCommunityCommentMutation();

	const onDeleteComment = (postId: number | undefined, commentId: number | undefined) => () => {
		onDeleteCommentRTK({ postId, commentId });
	};

	const onDebounce = useDebounce();

	useEffect(() => {
		window.scrollTo(0, 500);
	}, []);

	return {
		onNavigate,
		getId,
		pathname,
		state,
		isLoading,
		isError,
		data,
		error,
		onDebounce,
		onPatchLiked,
		decokenNickname,
		onDeletePost,
		onSubmitPostComment,
		commentInfo,
		onChangeComment,
		onDeleteComment,
	};
};
