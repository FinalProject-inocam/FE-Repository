import * as RTK from "../../redux";

export const useReviewBar = () => {
	const [onDeleteShopCommentRTK, queryDelete] = RTK.useDeleteWrappingCommentMutation();
	console.log(queryDelete);
	const onDeleteShopComment = (shopId: string | undefined, reviewId: number | undefined) => () => {
		onDeleteShopCommentRTK({ shopId, reviewId });
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");

		return `${year}-${month}-${day}`;
	};

	// nickname decode
	const { nickname: currentUser } = RTK.useAppSelector(RTK.selectDecode);

	// like
	// const [patchWSReviewLikeRTK] = RTK.usePatchWrappingShopDetailLikeMutation();
	// const onReviewLikeHandler = (reviewId: number) => () => {
	// 	patchWSReviewLikeRTK({ shopId, reviewId });
	// };;
	return { onDeleteShopComment, formatDate, currentUser };
};