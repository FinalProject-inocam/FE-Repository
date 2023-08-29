import * as Type from "../../types";
import * as RTK from "../../redux";

export const useCommunity = ({getId, category}:{getId?:number | undefined, category?:string | undefined}): Type.UseCommunity => {
	const { isLoading, data, isError, error } = RTK.useGetCommunityQuery({getId, category});
	
	return { 
		isLoading, data, isError, error,
	};
};
