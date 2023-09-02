import { FC, useState } from "react";
// import * as SC from "../css";
import * as CP from "..";

export const DetailReviewArea: FC = () => {
	const [page, setPage] = useState<number>(1);
	return (
		<section>
			<CP.DetailReviewBanner />
			<CP.DetailReviewForm setPage={setPage}/>
			<CP.DetailReviewList page={page} setPage={setPage}/>
		</section>
	);
};
