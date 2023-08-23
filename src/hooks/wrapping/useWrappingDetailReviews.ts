import * as RTK from "../../redux";
import { useParams } from "react-router-dom";

export const useWrappingDetailReviews = () => {
	const { id: shopId } = useParams<{ id: string }>();
	const {
		isLoading: shopReviewIsLoading,
		data: shopReviewData,
		isError: shopReviewIsError,
		error: shopReviewError,
		isFetching: shopReviewIsFetching,
	} = RTK.useGetWrappingShopDetailReviewsQuery({ shopId, page: 1 });
	return { shopReviewIsLoading, shopReviewData, shopReviewIsError, shopReviewError, shopReviewIsFetching, shopId };
};
