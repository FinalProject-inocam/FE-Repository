import React from "react";
import * as Type from "../../types";
import * as SC from "../../components/css";
import * as CP from "../../components";

export const DetailRight: React.FC<Type.WrappingDetailProps> = ({ data }) => {
	return (
		<SC.DetailRightOutLine>
			<CP.DetailRightBanner data={data} />
			<CP.DetailRightInputForm />
			<CP.DetailRightReview />
		</SC.DetailRightOutLine>
	);
};
