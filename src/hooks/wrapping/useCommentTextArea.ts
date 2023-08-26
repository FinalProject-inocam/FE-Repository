import { useState, ChangeEvent, useEffect } from "react";
import { selectReviewFormReview, setReviewDate, useAppDispatch, useAppSelector } from "../../redux";

export const useCommentTextArea = () => {
	const [comment, setComment] = useState<string>("");
	const dispatch = useAppDispatch();
	const getComment = useAppSelector(selectReviewFormReview);
	const onChangeComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setComment(e.target.value);
	};
	const onBlurComment = () => {
		dispatch(setReviewDate({ review: comment }));
	};

	useEffect(() => {
		!!getComment === false && setComment("");
	}, [getComment]);

	return { comment, onChangeComment, onBlurComment };
};
