import React, { useState } from "react";
import * as SC from "../../components/css";
import * as Hooks from "../../hooks";
import * as CP from "../../components";
import * as RTK from "../../redux";

export const DetailRightInputForm: React.FC = () => {
	const {
		onSubmitShopComment,
		review,
		onChangeShopFiles,
		onChangeShopComment,
		handleRevisitChange,
		star,
		handleStarClick,
		previewImages,
	} = Hooks.useWrappingDetailInput();

	const [clicked, setClicked] = useState<boolean | null>(null);
	const { nickname } = RTK.useAppSelector(RTK.selectDecode);
	console.log(nickname);
	const handleRevisitClick = (value: boolean) => (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		handleRevisitChange(value);
		setClicked(value);
	};

	const fileInputRef = React.useRef<HTMLInputElement>(null);

	const handleFileClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		fileInputRef.current && fileInputRef.current.click();
	};

	return (
		<SC.DetailRightFormOutLine>
			<SC.DetailRightFormLayout onSubmit={onSubmitShopComment}>
				<SC.DetailRightFormUpperInner>
					<SC.DetailRightFromUpperButtons>
						<SC.ReviewFromUserName>{nickname}</SC.ReviewFromUserName>
						<CP.DetailRightStarPointer
							star={star}
							width={`20px`}
							height={`20px`}
							handleStarClick={handleStarClick}
						/>
						<div style={{ display: "flex", gap: "10px" }}>
							<CP.DetailButton.PositiveButton
								$buttonSize='revisit'
								value='true'
								onClick={handleRevisitClick(true)}
								$clicked={clicked === true}>
								{"재방문 의사"}
							</CP.DetailButton.PositiveButton>
							<CP.DetailButton.NegativeButton
								$buttonSize='never'
								value='false'
								onClick={handleRevisitClick(false)}
								$clicked={clicked === false}>
								{"재방문 없음"}
							</CP.DetailButton.NegativeButton>
						</div>
					</SC.DetailRightFromUpperButtons>
					{nickname ? (
						<CP.DetailButton.SubmitButton
							$buttonSize='submit'
							type='submit'
							value='제출하기'
							children={"리뷰 작성하기"}
						/>
					) : (
						<CP.DetailButton.SubmitButton
							$buttonSize='submit'
							type='submit'
							value='제출하기'
							children={"로그인하러 가기"}
						/>
					)}
				</SC.DetailRightFormUpperInner>
				<SC.ReviewFormReviewInputInner>
					<SC.ReviewFormReviewInput
						value={review}
						name='review'
						onChange={onChangeShopComment}
						placeholder='댓글입력해주세요'
					/>
				</SC.ReviewFormReviewInputInner>
				<SC.ReviewPreviewImageLayout>
					<SC.ReviewPreviewImageInner>
						{previewImages.map((src: string, index: number) => (
							<SC.ReviewPreviewImageItem key={index} src={src}></SC.ReviewPreviewImageItem>
						))}
					</SC.ReviewPreviewImageInner>
					<SC.ReviewUploadImageButton>
						<CP.DetailButton.UploadButton $buttonSize='upload' onClick={handleFileClick}>
							사진업로드+
						</CP.DetailButton.UploadButton>
						<input
							ref={fileInputRef}
							style={{ display: "none" }}
							type='file'
							name='image'
							accept='.png, .jpg, .jpeg'
							onChange={onChangeShopFiles}
							multiple
						/>
					</SC.ReviewUploadImageButton>
				</SC.ReviewPreviewImageLayout>
			</SC.DetailRightFormLayout>
		</SC.DetailRightFormOutLine>
	);
};
