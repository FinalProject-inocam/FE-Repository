import { FC } from "react";
// import * as SC from "../css";
import * as CP from "..";

export const DetailReviewArea: FC = () => {
	return (
		<section>
			<CP.DetailReviewBanner />
			<CP.DetailReviewForm />
			{/* <CP.DetailReviewList /> */}
		</section>
	);
};
