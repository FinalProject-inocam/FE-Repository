import { useState, ChangeEvent } from "react";
import { setReviewDate, useAppDispatch, useAppSelector, selectReviewFormRevisit } from "../../redux";

export const useRevisitRadio = (): any => {
	const [, setRevisit] = useState<number>(0);
	const dispatch = useAppDispatch();
	const getReisit = useAppSelector(selectReviewFormRevisit);
	const onChangeRevisit = (e: ChangeEvent<HTMLInputElement>) => {
		setRevisit(e.target.value === "true" ? 1 : 2);
		dispatch(setReviewDate({ revisit: e.target.value === "true" ? true : false }));
	};

	return { getReisit, onChangeRevisit };
};
