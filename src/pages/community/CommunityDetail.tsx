import React, { useState, useEffect } from "react"; // useEffect, useRef,
import { useCommunityDetail, useInfinityThrottle } from "../../hooks";
import * as SC from "../../-";
import * as RTK from "../../redux";
// import * as Type from "../../types";
// import * as AS from "../../assets";
import { communityBanner, heart, heartg } from "../../assets";
import { useParams } from "react-router-dom";

export const CommunityDetail: React.FC = () => {
	const { id: postId } = useParams<{ id: string }>();
	const [page, setPage] = useState<number>(1);
	const dispatch = RTK.useAppDispatch();

	const {
		state,
		onNavigate,
		isLoading,
		isError,
		data,
		error,
		onDeletePost,
		onSubmitPostComment,
		commentInfo,
		onChangeComment,
		// onDeleteComment,
		onDebounce,
		onPatchLiked,
		decokenNickname,
	} = useCommunityDetail({ setPage });

	const {
		data: commentsData,
		isSuccess,
		isFetching,
		isLoading: commentLoading,
		isError: commentError,
	} = RTK.useGetCommunityCommentQuery({ postId, page });
	console.log(commentsData, isSuccess, isFetching, commentLoading, commentError, setPage);

	const fetchNextRef = useInfinityThrottle(setPage, isFetching);

	useEffect(() => {
		if (isSuccess) {
			console.log("동작하자");
			// dispatch(RTK.setCommentData(commentsData.content));
		}
	}, [isSuccess, dispatch]);

	if (isLoading || commentLoading) return <div>... 로딩중</div>;
	else if (isError || commentError) return <div>에러발생... {JSON.stringify(error)}</div>;
	else {
		const { content, isLike, likeCount, title, postId, nickname } = data; // createAt // imageUrls // postId // commentsList
		return (
			<SC.FlexBox $fd='column' $ai='start' $jc='start' $gap={30}>
				<SC.SettingBtn
					onClick={onNavigate({ url: state })}
					children={<SC.CustomP $height='47px' $bColor='white' $size={1.125} children='목록으로' />}
				/>
				<SC.PostList $jc='flex-start' $gap={50}>
					<SC.FlexBox $fd='column' $gap={20} style={{ width: "100%" }}>
						<SC.CustomH1 $height='78px' $size={1.5} $types='bottomLine' children={title} />
						<SC.PerDiv children={content} />
						<SC.GridBox $gtc='repeat(3, 1fr)' $cgap={10}>
							{Array.from({ length: 3 }, (_, idx) => idx).map((imgs) => (
								<SC.FigureObjectFitImg
									key={imgs}
									width={"100%"}
									types='postInnerImg'
									src={communityBanner}
									alt='reviewImgs'
								/>
							))}
						</SC.GridBox>
						<SC.CommunityDetilHeart onClick={onDebounce(onPatchLiked, postId as number)} $gap={10}>
							<SC.FigureObjectFitImg
								width={"18px"}
								height={"16px"}
								src={isLike ? heart : heartg}
								alt='heart'
							/>
							<SC.CustomP children={likeCount} />
						</SC.CommunityDetilHeart>
						<SC.FlexBox style={{ width: "100%" }} $jc='space-between'>
							<SC.SettingsBtn
								onClick={onNavigate({ url: state })}
								$bColor='lightgray1'
								$types='postinnerSettingBtn1'
								children={
									<SC.CustomP $height='50px' $bColor='white' $size={1.25} children='목록으로' />
								}
							/>
							<SC.FlexBox $gap={10}>
								{nickname === decokenNickname && (
									<>
										<SC.SettingsBtn
											$bColor='lightgray1'
											$types='postinnerSettingBtn2'
											children={
												<SC.CustomP
													$height='50px'
													$bColor='white'
													$size={1.25}
													children='수정'
												/>
											}
										/>
										<SC.SettingsBtn
											onClick={onDeletePost(postId as number)}
											$bColor='lightgray1'
											$types='postinnerSettingBtn2'
											children={
												<SC.CustomP
													$height='50px'
													$bColor='white'
													$size={1.25}
													children='삭제'
												/>
											}
										/>
									</>
								)}
							</SC.FlexBox>
						</SC.FlexBox>
					</SC.FlexBox>
					<div style={{ width: "100%", position: "relative" }}>
						<SC.CustomH1 $size={1.5} children='댓글' />
						<SC.CommunityCommentText
							value={commentInfo}
							onChange={onChangeComment}
							placeholder={
								decokenNickname ? "댓글을 입력해주세요" : "댓글 작성은 로그인 후 이동 가능합니다."
							}
						/>
						<SC.CommunityCommentTextBtn
							onClick={onSubmitPostComment(postId)}
							children={<SC.CustomP $height='45px' $bColor='blue' $size={1.25} children='작성' />}
						/>
					</div>
					<SC.FlexBox style={{ width: "890px" }} $fd='column' $ai='start' $jc='start' $gap={20}></SC.FlexBox>
					{commentsData.content.map((list: any) => (
						<div key={list.commentId}>{list.comment}</div>
					))}
					{!commentsData.last && (
						<div ref={fetchNextRef} style={{ width: "100%", height: "50px", backgroundColor: "yellow" }} />
					)}
				</SC.PostList>
			</SC.FlexBox>
		);
	}
};

/*
	{commentsData.content.map((comment: Type.Comment) => (
							<SC.FlexBox
								style={{ width: "100%", gap: "10px", position: "relative" }}
								key={comment.commentId}
								$fd='column'
								$ai='normal
								'>
								<SC.FlexBox
									$fd='row'
									$jc='space-between'
									style={{ width: "100%", gap: "10px", position: "relative" }}>
									<SC.FlexBox $gap={10}>
										<div style={{ fontWeight: "600" }}>{comment.nickname}</div>
										<div style={{ color: "#bbbbc9" }}>{comment.createdAt.split("T")[0]}</div>
									</SC.FlexBox>
									<div onClick={() => onMoreModalButton(comment.commentId)()}>
										<SC.FigureImg
											width='30px'
											height='8px'
											src={AS.commentMoreButton}
											alt='morebutton'
										/>
									</div>
									{activeModalCommentId === comment.commentId && (
										<SC.MoreModal
											ref={modalRef}
											key={comment.commentId}
											$fd='column'
											$ai='flex-start'>
											<div style={{ fontWeight: "bold", color: "#4c4cff" }}>유저 차단하기</div>
											<div style={{ fontWeight: "bold", color: "#1d1d1f" }}>신고하기</div>
											<div style={{ fontWeight: "bold", color: "#1d1d1f" }}>차단하기</div>
										</SC.MoreModal>
									)}
								</SC.FlexBox>

								<div style={{ padding: "0 20px" }}>{comment.comment}</div>

								{decokenNickname === comment.nickname && (
									<button onClick={onDeleteComment(postId, comment.commentId)} children='댓글삭제' />
								)}
							</SC.FlexBox>
						))}



							// modal
	// const [activeModalCommentId, setActiveModalCommentId] = useState<number | null>(null);
	// const onMoreModalButton = (commentId: number) => () => {
	// 	setActiveModalCommentId((prevState) => (prevState === commentId ? null : commentId));
	// };
	// const modalRef = useRef<HTMLDivElement>(null);

	// useEffect(() => {
	// 	const handleClickOutside = (event: any) => {
	// 		if (modalRef.current && !modalRef.current.contains(event.target)) {
	// 			setActiveModalCommentId(null);
	// 		}
	// 	};
	// 	document.addEventListener("mousedown", handleClickOutside);

	// 	return () => {
	// 		document.removeEventListener("mousedown", handleClickOutside);
	// 	};
	// }, []);
*/
