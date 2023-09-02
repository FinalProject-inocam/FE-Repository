import React from "react"; //ChangeEvent, FormEvent, useEffect, useState
// import * as RTK from "../../redux";
// import * as CP from "../../components";
import * as Type from "../../types";

export const EditWrappingReview: React.FC<Type.EditWrappingShopReview> = () => {
	// reviewId, shopId
	// const [edit, setEdit] = useState<Boolean>(false);
	// const [review, setReview] = useState<string>("");

	// const onChangeValue = (e: ChangeEvent<HTMLInputElement>): void => {
	// 	setReview(e.target.value);
	// };

	// // 별을 클릭했을 때 별점을 업데이트하는 함수
	// const [star, setStar] = useState<number>(0);
	// const handleStarClick = (starNumber: number) => {
	// 	setStar(starNumber);
	// };

	// const [revisit, setRevisit] = useState<boolean>(false);
	// const handleRevisitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	setRevisit(e.target.checked);
	// };

	// const onToogleEdit = () => {
	// 	setEdit(!edit);
	// };

	// const [onPatchShopCommentRTK, { isSuccess: patchIsSuccess, data, isError: patchIsError, error }] =
	// 	RTK.usePatchWrappingCommentMutation();

	// const onSubmitPatchComments = (e: FormEvent<HTMLFormElement>) => {
	// 	e.preventDefault();
	// 	const formData = new FormData();
	// 	formData.append("data", new Blob([JSON.stringify({ review, star, revisit })], { type: "application/json" }));
	// 	onPatchShopCommentRTK({ shopId, reviewId, formData });
	// 	setEdit(!edit);
	// 	setReview("");
	// 	setStar(0);
	// 	setRevisit(false);
	// };

	// useEffect(() => {
	// 	patchIsSuccess && console.log(data);
	// 	patchIsError && console.log(error);
	// }, [patchIsSuccess, data, patchIsError, error]);

	return (
		<div>
			{/* {!edit ? (
				<div>
					<p onClick={onToogleEdit}>수정</p>
				</div>
			) : (
				<form onSubmit={onSubmitPatchComments}>
					<input value={review} name='review' onChange={onChangeValue} />
					<input type='checkbox' value='재방문의사' onChange={handleRevisitChange} />
					<CP.ReviewStarPointer
						star={star}
						width={`15px`}
						height={`15px`}
						handleStarClick={handleStarClick}
					/>
					<input type='submit' value='수정제출' />
					<button onClick={onToogleEdit}>수정취소</button>
				</form>
			)} */}
		</div>
	);
};
