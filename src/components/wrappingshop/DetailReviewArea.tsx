import { FC } from "react";
import * as SC from "../css";
import * as CP from "..";

export const DetailReviewArea: FC = () => {
	return (
		<SC.DetailReviewOutLine>
			<CP.DetailReviewBanner />
			<CP.DetailReviewForm />
			<CP.DetailReviewList />
		</SC.DetailReviewOutLine>
	);
};
