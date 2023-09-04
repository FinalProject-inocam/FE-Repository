import * as RTK from "../../redux";

export const useReviewBar = () => {
	const [onDeleteShopCommentRTK] = RTK.useDeleteWrappingCommentMutation();
	const onDeleteShopComment = (shopId: string | undefined, reviewId: number | undefined) => () => {
		onDeleteShopCommentRTK({ shopId, reviewId });
		console.log(shopId, reviewId);
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

	return { onDeleteShopComment, formatDate, currentUser };
};
