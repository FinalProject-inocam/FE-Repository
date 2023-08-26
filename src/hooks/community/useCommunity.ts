import * as Type from "../../types";
import * as RTK from "../../redux";

export const useCommunity = (): Type.UseCommunity => {
	const { isLoading, data, isError, error } = RTK.useGetCommunityQuery({});
	console.log(data);

	// 페이지 네이션으로 인해서 각종 정보들이 data에 담겨 있고 데이터에 접근하기 위해서는 data.content 에 접근해야 된다.

	return { isLoading, data, isError, error };
};
