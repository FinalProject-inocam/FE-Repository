import { useState, ChangeEvent } from "react";
import * as Type from "../../types";
import * as RTK from "../../redux";

export const useRevisitRadio = (): Type.ReviewRadioType => {
	const [, setRevisit] = useState<number | null>(0);
	const dispatch = RTK.useAppDispatch();
	const getRevisit = RTK.useAppSelector(RTK.selectReviewFormRevisit);
	const onChangeRevisit = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value === "true" ? 1 : e.target.value === "false" ? 2 : 0;
		setRevisit(value);
		dispatch(RTK.setReviewDate({ revisit: value }));
	};

	return { getRevisit, onChangeRevisit };
};

/*
		setRevisit(e.target.value === "true" ? 1 : 2);
		dispatch(setReviewDate({ revisit: e.target.value === "true" ? true : false }));
*/
