import { FormEvent, useState, useEffect } from "react";
import * as RTK from "../../redux";
import { selectReviewForm, useAppSelector } from "../../redux";
import { useParams } from "react-router-dom";

export const useReviewForm = (): any => {
	const { id: shopId } = useParams<string>();
	const getReviewData = useAppSelector(selectReviewForm);
	const [compressed, setCompressed] = useState<boolean>(false);
	const [compressedImg, setCompressedImg] = useState<any>(null);
	const [previewImg, setPreviewImg] = useState<(string | ArrayBuffer | null)[]>([]);
	const [onPostWSReviewRTK, queryInfo] = RTK.usePostWrappingCommentMutation();
	const dispatch = RTK.useAppDispatch();

	const onSubmitReview = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("data", new Blob([JSON.stringify(getReviewData)], { type: "application/json" }));
		for (let i = 0; i < compressedImg.length; i++) {
			compressed && formData.append("images", compressedImg[i]);
		}
		onPostWSReviewRTK({ shopId, formData });
		setCompressedImg(null);
		setCompressed(false);
		setPreviewImg([]);
		dispatch(RTK.deleteReiewDate());
	};
	useEffect(() => {
		console.log(queryInfo);
	}, [queryInfo]);
	return { previewImg, setPreviewImg, setCompressedImg, compressed, setCompressed, onSubmitReview };
};
