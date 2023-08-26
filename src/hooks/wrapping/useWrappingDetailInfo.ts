import * as RTK from "../../redux";
import { useParams } from "react-router-dom";

// 수정 혹은 삭제 예정
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
