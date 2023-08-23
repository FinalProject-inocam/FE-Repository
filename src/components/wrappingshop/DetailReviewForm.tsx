import React, { useState } from "react";
import * as SC from "../css";
import * as Hooks from "../../hooks";
import * as CP from "..";
import * as RTK from "../../redux";

export const DetailReviewForm: React.FC = () => {
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
		<SC.ReviewFormOutLine $fd='column' $ai='stretch'>
			<SC.ReviewFormLayout $jc='space-between' $fd='column' $ai='normal' $gap={10} onSubmit={onSubmitShopComment}>
				<SC.FlexBox $jc='space-between'>
					<SC.ReviewUserButtonInner $jc='space-between' $gap={20}>
						{nickname ? (
							<SC.ReviewFromUserName $jc='flex-start' $ai='flex-start'>
								{nickname}
							</SC.ReviewFromUserName>
						) : (
							<SC.ReviewFromUserName $jc='flex-start' $ai='flex-start'>
								로그인이 필요합니다
							</SC.ReviewFromUserName>
						)}
						<CP.ReviewStarPointer
							star={star}
							width={`20px`}
							height={`20px`}
							handleStarClick={handleStarClick}
						/>
						<SC.FlexBox $gap={10}>
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
						</SC.FlexBox>
					</SC.ReviewUserButtonInner>
					{nickname ? (
						<CP.DetailButton.SubmitButton $buttonSize='submit' type='submit' children={"리뷰 작성하기"} />
					) : (
						<CP.DetailButton.LoginButton $buttonSize='login' type='submit' children={"로그인하기"} />
					)}
				</SC.FlexBox>
				<SC.ReviewFormInputInner>
					<SC.ReviewFormInput
						value={review}
						name='review'
						onChange={onChangeShopComment}
						placeholder='댓글입력해주세요'
					/>
				</SC.ReviewFormInputInner>
				<SC.FlexBox $jc='flex-start' $gap={previewImages.length > 0 ? 10 : 0}>
					<SC.ReviewPreviewImageInner $gap={10}>
						{previewImages.map((src: string, index: number) => (
							<SC.ReviewPreviewImageItem key={index} src={src}></SC.ReviewPreviewImageItem>
						))}
					</SC.ReviewPreviewImageInner>
					<SC.FlexBox $ai='flex-start'>
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
					</SC.FlexBox>
				</SC.FlexBox>
			</SC.ReviewFormLayout>
		</SC.ReviewFormOutLine>
	);
};
