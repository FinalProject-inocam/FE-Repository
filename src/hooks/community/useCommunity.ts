import * as Type from "../../types";
import * as RTK from "../../redux";

export const useCommunity = ({getId}:{getId:number | undefined}): Type.UseCommunity => {
	const { isLoading, data, isError, error } = RTK.useGetCommunityQuery({getId});
	return { isLoading, data, isError, error };
};
