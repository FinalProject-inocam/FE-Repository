import React, { useState } from "react"; // useEffect, useRef,
import { useCommunityDetail } from "../../hooks"; // useInfinityThrottle
import * as SC from "../../components";
import * as RTK from "../../redux";
// import * as Type from "../../types";
import * as AS from "../../assets";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { Styled } from "../../types";
import * as Hooks from "../../hooks";

const CommentBox: React.FC<any> = ({ comment, children, postId }) => {
	const { onNavigate } = Hooks.useRouter();
	const [activeModal, setActiveModal] = useState(false);
	const timehandle = Hooks.usePostingTime();
	const { sub, nickname } = RTK.useAppSelector(RTK.selectDecode);

	const onModatToggle = () => {
		setActiveModal((pre) => !pre);
	};

	const onMouseLeaveModal = () => {
		activeModal && setActiveModal((pre) => !pre);
	};

	const [onDeleteComment] = RTK.useDeleteCommunityCommentMutation();
	const onDeleteCommentHandler = (commentId: number, postId: number) => () => {
		onDeleteComment({ commentId, postId });
		onNavigate({ url: `/community/1` })();
	};

	return (
		<CommentLayout $fd='column' $ai='start' $gap={10} onMouseLeave={onMouseLeaveModal}>
			<SC.FlexBox style={{ width: "100%" }} $jc='space-between'>
				<SC.FlexBox $gap={10}>
					<SC.FlexBox $gap={5}>
						{comment.isAdmin && (
							<SC.FigureObjectFitImg width='14px' height='14px' src={AS.adminMark} alt='AdminImg' />
						)}
						<div>{comment.nickname}</div>
					</SC.FlexBox>
					<div>{timehandle(comment.createdAt)}</div>
				</SC.FlexBox>
				<SC.FigureImg
					width='30px'
					height='8px'
					types='cursor'
					src={AS.commentMoreButton}
					alt='morebutton'
					onClick={onModatToggle}
				/>
			</SC.FlexBox>
			<CommentInnerText>{comment.comment}</CommentInnerText>
			<CommentInnerText $color='blue' $fontW={700} children='답글쓰기' />
			{activeModal && (
				<SC.MoreModal key={comment.commentId} $fd='column' $ai='flex-start'>
					{sub === "E001" && <div style={{ fontWeight: "bold", color: "#4c4cff" }}>유저 차단하기</div>}
					<div style={{ fontWeight: "bold", color: "#1d1d1f" }}>신고하기</div>
					<div style={{ fontWeight: "bold", color: "#1d1d1f" }}>차단하기</div>
					{nickname === comment.nickname && (
						<>
							<div style={{ fontWeight: "bold", color: "#1d1d1f" }}>수정하기</div>
							<div
								onClick={onDeleteCommentHandler(comment.commentId, postId)}
								style={{ fontWeight: "bold", color: "#1d1d1f" }}>
								삭제하기
							</div>
						</>
					)}
				</SC.MoreModal>
			)}
			{children}
		</CommentLayout>
	);
};

export const CommunityDetail: React.FC = () => {
	const { id: postId } = useParams<{ id: string }>();
	const [page, setPage] = useState<number>(1);

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
		isFetching,
		isLoading: commentLoading,
		isError: commentError,
	} = RTK.useGetCommunityCommentQuery({ postId, page });

	const fetchNextRef = Hooks.useInfinityThrottle(setPage, isFetching);

	if (isLoading) return <div>... 로딩중</div>;
	else if (isError) return <div>에러발생... {JSON.stringify(error)}</div>;
	else {
		const { content, isLike, likeCount, title, postId, nickname, imageUrls } = data; // createAt // imageUrls // postId // commentsList

		return (
			<SC.FlexBox $fd='column' $ai='start' $jc='start' $gap={30}>
				<SC.SettingBtn
					onClick={() => {
						onNavigate({ url: `/community/1` })();
					}}
					children={<SC.CustomP $height='47px' $bColor='white' $size={1.125} children='목록으로' />}
				/>
				<SC.PostList $jc='flex-start' $gap={50}>
					<SC.FlexBox $fd='column' $gap={20} style={{ width: "100%" }}>
						<SC.CustomH1 $height='78px' $size={1.5} $types='bottomLine' children={title} />
						<SC.PerDiv children={content} />
						<SC.GridBox $gtc='repeat(3, 1fr)' $cgap={10}>
							{imageUrls.map((imgs: string) => (
								<SC.FigureObjectFitImg
									key={imgs}
									width={"100%"}
									types='postInnerImg'
									src={imgs}
									alt='reviewImgs'
								/>
							))}
						</SC.GridBox>
						<SC.CommunityDetilHeart onClick={onDebounce(onPatchLiked, postId as number)} $gap={10}>
							<SC.FigureObjectFitImg
								width={"18px"}
								height={"16px"}
								src={isLike ? AS.heart : AS.heartg}
								alt='heart'
							/>
							<SC.CustomP children={likeCount} />
						</SC.CommunityDetilHeart>
						<SC.FlexBox style={{ width: "100%" }} $jc='space-between'>
							<SC.SettingsBtn
								onClick={() => {
									onNavigate({ url: state });
								}}
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
					{/* 댓글공간 */}
					<div style={{ width: "100%" }}>
						{commentLoading ? (
							<div>로딩 중...</div>
						) : commentError ? (
							<div>서버 끊김</div>
						) : (
							commentsData &&
							commentsData.content.map((comment: any, idx: number) => (
								<CommentBox key={comment.commentId} comment={comment} postId={postId}>
									{idx === commentsData.size - 2 && (
										<div
											ref={fetchNextRef}
											style={{
												width: "100%",
												height: "10px",
												backgroundColor: "yellow",
												position: "absolute",
												bottom: 0,
											}}
										/>
									)}
								</CommentBox>
							))
						)}
					</div>
				</SC.PostList>
			</SC.FlexBox>
		);
	}
};

const CommentLayout = styled.section<Partial<Styled>>`
	${SC.Flex}
	position:relative;
	width: 100%;
	padding: 20px 0 20px 0;
	border-bottom: 1px solid #bbbbc9;
`;

const CommentInnerText = styled.div<Partial<Styled>>`
	padding: 0 20px;
	color: ${({ $color, theme }) => $color && theme.color[$color]};
	font-weight: ${({ $fontW }) => $fontW && $fontW};
	text-align: justify;
	white-space: pre-line;
`;
