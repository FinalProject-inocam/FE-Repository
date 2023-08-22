import React from "react";
import * as Type from "../../types";
import * as CP from "../../components/wrappingshop";
import * as SC from "../../components/css";

export const DetailLeft: React.FC<Type.WrappingDetailProps> = ({ isLoading, isError, error, data }) => {
	if (isLoading) return <div>... 로딩중</div>;
	else if (isError) return <div>에러발생... {JSON.stringify(error)}</div>;
	else {
		return (
			<>
				<SC.DetailLeftOutLine>
					<CP.DetailLeftMainBanner data={data} />
					<CP.DetailLeftShopInfo data={data} />
					<CP.DetailLeftShopScore data={data} />
				</SC.DetailLeftOutLine>
			</>
		);
	}
};
