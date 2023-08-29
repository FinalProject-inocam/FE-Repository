import { useState, ChangeEvent } from "react";
import * as Type from "../../types";
import * as RTK from "../../redux";

export const useRevisitRadio = (): Type.ReviewRadioType => {
	const [, setRevisit] = useState<number | null>(null);
	const dispatch = RTK.useAppDispatch();
	const getRevisit = RTK.useAppSelector(RTK.selectReviewFormRevisit);
	const onChangeRevisit = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value === "true" ? 1 : e.target.value === "false" ? 2 : 0;
		setRevisit(value);
		dispatch(RTK.setReviewDate({ revisit: value }));
	};

	return { getRevisit, onChangeRevisit };
};
