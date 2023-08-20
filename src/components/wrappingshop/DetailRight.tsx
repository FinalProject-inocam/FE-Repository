import React from "react";
import * as Type from "../../types";
import * as CP from "../../components";

export const DetailRight: React.FC<Type.WrappingDetailProps> = ({ isLoading, isError, error, data }) => {
	if (isLoading) return <div>... 로딩중</div>;
	else if (isError) return <div>에러발생... {JSON.stringify(error)}</div>;
	else {
		return (
			<div style={{ position: "relative" }}>
				<CP.DetailRightBanner data={data} />
				<CP.DetailRightInputForm />
				<CP.DetailRightReview data={data} />
			</div>
		);
	}
};
