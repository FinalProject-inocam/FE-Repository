import * as RTK from "../../redux";
import { useParams } from "react-router-dom";

export const useWrappingDetailInfo = () => {
	const { id: shopId } = useParams<{ id: string }>();
	// RTK - 랩핑샵 GET
	const {
		isLoading: shopDetailIsLoading,
		data: shopDetailData,
		isError: shopDetailIsError,
		error: shopDetailError,
	} = RTK.useGetWrappingShopDetailQuery(shopId);

	return {
		shopDetailIsLoading,
		shopDetailData,
		shopDetailIsError,
		shopDetailError,
	};
};
