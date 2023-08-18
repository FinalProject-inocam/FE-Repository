import React, { useState } from "react";
import * as Type from "../../types";
import { FigureObjectFitImg } from "../atom";
import * as SC from "../../components/css";
// import * as CP from "../../components";
import * as Hooks from "../../hooks";

export const DetailRight: React.FC<Type.WrappingDetailProps> = ({ isLoading, data }) => {
	const {
		// // onSubmitShopComment,
		// // shopCommentInfo,
		// // onChangeShopComment,
		// // onChageShopFile,
		// // handleRevisitChange,
		// onDeleteShopComment,
	} = Hooks.useWrappingDetail();

	// const formatDate = (dateString: string) => {
	// 	const date = new Date(dateString);
	// 	const year = date.getFullYear();
	// 	const month = String(date.getMonth() + 1).padStart(2, "0");
	// 	const day = String(date.getDate()).padStart(2, "0");

	// 	return `${year}-${month}-${day}`;
	// };
	const [showMore, setShowMore] = useState(false);

	if (isLoading || !data) return <div>로딩 중....</div>;

	const moreImagesCount = data.banner.length - 4;
	console.log(moreImagesCount);

	return (
		<div style={{ backgroundColor: "yellow", position: "relative" }}>
			<SC.RightBanner $gtc={"repeat(4, 1fr)"} $gap={20}>
				{data.banner.map((_: string, idx: number) => (
					<div key={idx} style={{ position: "relative" }}>
						{idx <= 3 || showMore ? (
							<FigureObjectFitImg width={`100%`} height={`159px`} src={data.banner[idx]} alt='SomeImg' />
						) : null}

						{idx === 3 && moreImagesCount > 0 && !showMore && (
							<SC.MoreButton onClick={() => setShowMore(true)}>더보기 ({moreImagesCount}+)</SC.MoreButton>
						)}
					</div>
				))}
			</SC.RightBanner>
			{/* <SC.RightContentWrapper> */}
			{/* <form onSubmit={onSubmitShopComment}>
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
						<input
							type='file'
							name='image'
							accept='.png, .jpg, .jpeg'
							onChange={onChageShopFile}
							multiple
						/>
						<input type='checkbox' value='재방문의사' onChange={handleRevisitChange} />
						<input type='submit' value='제출하기' />
					</form> */}
			{/* {data.reviews &&
					data.reviews.map(
						({
							reviewId,
							nickname,
							review,
							imageUrls,
							star,
							revisit,
							createAt,
						}: Type.TotalWrappingShopReview) => {
							return (
								<SC.ReviewBox key={reviewId}>
									<SC.ReviewUpperContainer $jc='space-between'>
										<SC.ReviewUserWrapper>
											<SC.ReviewUserName>{nickname}</SC.ReviewUserName>
											{Array.from({ length: 5 }).map((_, index) => (
												<SC.ReviewStar key={index}>{index < star ? "★" : "☆"}</SC.ReviewStar>
											))}
											<SC.ReviewScore>({star})</SC.ReviewScore>
											<SC.ReviewRevisit>
												{revisit && revisit ? "재방문의사" : ""}
											</SC.ReviewRevisit>
										</SC.ReviewUserWrapper>
										<SC.ReviewMenueWrapper>
											<p>신고</p>
											<CP.EditWrappingReview reviewId={reviewId} shopId={data.shopId} />
											<p onClick={onDeleteShopComment(data.shopId, reviewId)}>삭제하기</p>
											<p>{formatDate(createAt)}</p>
										</SC.ReviewMenueWrapper>
									</SC.ReviewUpperContainer>

									<SC.ReviewContents>{review}</SC.ReviewContents>

									{imageUrls &&
										imageUrls.map((url, index) => (
											<SC.ReviewSimpleImage key={index}>
												<SC.ReviewCommentimg src={url} alt={`이미지-${index}`} />
											</SC.ReviewSimpleImage>
										))}
								</SC.ReviewBox>
							);
						}
					)}
			</SC.RightContentWrapper> */}
		</div>
	);
};
