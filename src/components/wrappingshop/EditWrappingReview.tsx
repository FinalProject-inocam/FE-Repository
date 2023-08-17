import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import * as RTK from "../../redux";
import * as Type from "../../types";

export const EditWrappingReview: React.FC<Type.EditWrappingShopReview> = ({ reviewId, shopId }) => {
	const [edit, setEdit] = useState<Boolean>(false);
	const [inputValue, setInputValue] = useState<Type.WrappingShopReview>({ review: "", star: 0 });

	const onChangeValue = (e: ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		setInputValue({ ...inputValue, [name]: value });
	};

	const onToogleEdit = () => {
		setEdit(!edit);
	};

	const [onPatchShopCommentRTK, { isSuccess: patchIsSuccess, data, isError: patchIsError, error }] =
		RTK.usePatchWrappingCommentMutation();

	const onSubmitPatchComments = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("data", new Blob([JSON.stringify(inputValue)], { type: "application/json" }));
		onPatchShopCommentRTK({ shopId, reviewId, formData });
		setEdit(!edit);
		setInputValue({ review: "", star: 0 });
	};

	useEffect(() => {
		patchIsSuccess && console.log(data);
		patchIsError && console.log(error);
	}, [patchIsSuccess, data, patchIsError, error]);

	return (
		<div>
			{!edit ? (
				<div>
					<p onClick={onToogleEdit}>수정하기</p>
				</div>
			) : (
				<form onSubmit={onSubmitPatchComments}>
					<input value={inputValue.review} name='review' onChange={onChangeValue} />
					<input value={inputValue.star} name='star' onChange={onChangeValue} />
					<input type='submit' value='수정제출' />
					<button onClick={onToogleEdit}>수정취소</button>
				</form>
			)}
		</div>
	);
};
