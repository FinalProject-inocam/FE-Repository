import { ChangeEvent, FC, useEffect, useState } from "react"; //ChangeEvent, FormEvent, useEffect, useState
import * as RTK from "../../redux";
import * as SC from "../css";
import * as Type from "../../types";
import * as AS from "../../assets";

export const EditWrappingReview: FC<Type.EditWrappingShopReview> = ({ reviewId, shopId, setEdit }) => {
	const dispatch = RTK.useAppDispatch();

	// 리뷰
	const [review, setReview] = useState<string>("");
	// const getReviewData = RTK.useAppSelector(RTK.selectReviewForm);
	const onChangeEditReview = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setReview(e.target.value);
	};

	const onBlurComment = () => {
		dispatch(RTK.updateReview({ review: review }));
	};

	// 별
	// const getStar = RTK.useAppSelector(RTK.selectReviewFormStar);
	const [star, setStar] = useState<number>(0);
	const onChangeStart = (count: number) => (e: React.MouseEvent<HTMLImageElement>) => {
		e.preventDefault();
		setStar(count);
		dispatch(RTK.updateReview({ star: star }));
	};

	// 재방문
	const [revisit, setRevisit] = useState<number | null>(null);
	const onChangeRevisit = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value === "true" ? 1 : e.target.value === "false" ? 2 : 0;
		setRevisit(value);
	};

	// 이미지
	const [compressedImg, setCompressedImg] = useState<File[] | null>(null);

	// 수정 제출
	const [onPatchShopCommentRTK, { isSuccess: patchIsSuccess, data, isError: patchIsError, error }] =
		RTK.usePatchWrappingCommentMutation();

	const onSubmitPatchComments = () => {
		const formData = new FormData();
		console.log(review, star, revisit);
		formData.append("data", new Blob([JSON.stringify({ review, star, revisit })], { type: "application/json" }));
		if (compressedImg) {
			for (let i = 0; i < compressedImg.length; i++) {
				formData.append("images", compressedImg[i]);
			}
		}
		onPatchShopCommentRTK({ shopId, reviewId, formData });
		setReview("");
		setCompressedImg(null);
		setStar(0);
		setRevisit(null);
		dispatch(RTK.deleteReviewDate());
		setEdit(false);
	};

	useEffect(() => {}, [patchIsSuccess, data, patchIsError, error]);

	return (
		<div>
			<div style={{ width: "811px" }}>
				<SC.FlexBox $fd='column' $gap={10}>
					<SC.FlexBox style={{ width: "100%" }} $jc='space-between'>
						<SC.FlexBox $gap={20}>
							<SC.ReviewStar>
								{Array.from({ length: 5 }).map((_, index) => (
									<SC.StarImg
										key={index}
										$size={20}
										src={index < star ? AS.ReviewStarFull : AS.ReviewStarEmpty}
										alt={`별-${index}`}
										onClick={onChangeStart(index + 1)}
									/>
								))}
							</SC.ReviewStar>
							<SC.FlexBox $gap={10}>
								<input
									type='radio'
									name='review'
									value='true'
									id='editReviewOn'
									onChange={onChangeRevisit}
									style={{ display: "none" }}
								/>
								<SC.RevisitRadioLabel
									htmlFor='editReviewOn'
									$type='edit'
									$state={revisit === 1 ? 1 : 0}>
									재방문 의사
								</SC.RevisitRadioLabel>
								<input
									type='radio'
									name='review'
									value='false'
									id='editReviewOff'
									onChange={onChangeRevisit}
									style={{ display: "none" }}
								/>
								<SC.RevisitRadioLabel
									htmlFor='editReviewOff'
									$type='edit'
									$state={revisit === 2 ? 2 : 0}>
									재방문 없음
								</SC.RevisitRadioLabel>
							</SC.FlexBox>
						</SC.FlexBox>
						<SC.FlexBox $gap={20}>
							<SC.EditCancleButton children='수정취소' />
							<SC.EditButton type='button' onClick={onSubmitPatchComments} children='수정제출' />
						</SC.FlexBox>
					</SC.FlexBox>
					<div style={{ width: "811px" }}>
						<SC.TextaAreaLayout>
							<SC.TextArea
								maxLength={300}
								value={review}
								onChange={onChangeEditReview}
								onBlur={onBlurComment}
							/>
							<SC.TextaAreaCount $size={review.length} children={`${review.length}/300`} />
						</SC.TextaAreaLayout>
					</div>
				</SC.FlexBox>
			</div>
		</div>
	);
};
