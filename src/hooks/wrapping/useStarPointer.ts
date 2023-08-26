import { useState } from "react";
import { selectReviewFormStar, setReviewDate, useAppDispatch, useAppSelector } from "../../redux";

export const useStarPointer = (): any => {
	const [, setStar] = useState<number>(0);
	const dispatch = useAppDispatch();
	const getStar = useAppSelector(selectReviewFormStar);
	const onChangeStart = (count: number) => () => {
		setStar(count);
		dispatch(setReviewDate({ star: count }));
	};
	return { getStar, onChangeStart };
};
