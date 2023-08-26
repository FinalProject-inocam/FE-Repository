import { FC } from "react";
import * as CP from "..";
import * as SC from "../css";
import { useReviewForm } from "../../hooks";

export const DetailReviewForm: FC = () => {
	const { previewImg, setPreviewImg, setCompressedImg, compressed, setCompressed, onSubmitReview } = useReviewForm();

	return (
		<SC.ReviewFormLayout onSubmit={onSubmitReview} $gtc='80px 1fr' $cgap={20}>
			<SC.CustomH3 $types='revisit'>nickName</SC.CustomH3>
			<SC.FlexBox
				$fd='column'
				$gap={10}
				$ai='flex-start'
				$jc='flex-start'
				style={{ border: "1px solid red", position: "relative" }}>
				<SC.SubmitInput type='submit' value='리뷰작성하기' $bColor='blue' $borderR='5px' $types='reviewForm' />
				<SC.ReviewFormFlex $gap={20}>
					<CP.StarPointer size={20} />
					<CP.RevisitRadio />
				</SC.ReviewFormFlex>
				<CP.CommentTextArea />
				<CP.PrevImage
					previewImg={previewImg}
					setPreviewImg={setPreviewImg}
					setState={setCompressedImg}
					compressed={compressed}
					setCompressed={setCompressed}
				/>
			</SC.FlexBox>
		</SC.ReviewFormLayout>
	);
};
