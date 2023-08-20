import React from "react";
import * as Hooks from "../../hooks";

export const DetailRightInputForm: React.FC = () => {
	const { onSubmitShopComment, shopCommentInfo, onChangeShopFiles, onChangeShopComment, handleRevisitChange } =
		Hooks.useWrappingDetail();

	return (
		<form onSubmit={onSubmitShopComment}>
			<input
				value={shopCommentInfo.review}
				name='review'
				onChange={onChangeShopComment}
				placeholder='댓글입력해주세요'
			/>
			<input
				value={shopCommentInfo.star}
				name='star'
				onChange={onChangeShopComment}
				placeholder='댓글입력해주세요'
			/>
			<input type='file' name='image' accept='.png, .jpg, .jpeg' onChange={onChangeShopFiles} multiple />
			<input type='checkbox' value='재방문의사' onChange={handleRevisitChange} />
			<input type='submit' value='제출하기' />
		</form>
	);
};
