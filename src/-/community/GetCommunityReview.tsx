import { FC } from "react";
import * as SC from "../css";
import * as Hook from "../../hooks";
import * as ASS from "../../assets";
import * as CP from "..";

export const GetCommunityReview: FC<any> = ({ data }) => {
	const { postId, thumbnail, category, title, nickname, view, createAt, content, isLike, likeCount, commentCount } =
		data;
	const { onNavigate, pathname } = Hook.useRouter();

	return (
		<SC.PostInnerItem onClick={onNavigate({ url: `/community/review/${postId}`, opts: { state: pathname } })}>
			{" "}
			{/* url */}
			<CP.FigureObjectFitImg width={"100%"} height={"150px"} src={thumbnail} alt='thumbnail' />
			<SC.PostInnerContext>
				<SC.CategoryBtn
					$bColor='lightgray1'
					$types='PostTag'
					children={<SC.CustomP $height='34px' $bColor='lightgray1' children={category} />}
				/>
				<SC.FlexBox $fd='column' $gap={8} $ai='start' $jc='start' style={{ width: "100%" }}>
					<SC.PostingText $height='34px' children={<SC.ShorteningP children={title} />} />
					<SC.PostingText $height='24px' children={<SC.ShorteningP children={content} />} />
					<div>
						{nickname} 조회수 {view} {createAt.split("T")[0]}
					</div>
				</SC.FlexBox>
				<SC.CommumityLikeRevieLayout $gap={5}>
					<CP.GetCommunityLiked postId={postId} isLike={isLike} likeCount={likeCount} />
					<SC.FlexBox $gap={5}>
						<CP.FigureObjectFitImg width={"18px"} height={"16px"} src={ASS.posting} alt='posting' />
						<p children={commentCount} />
					</SC.FlexBox>
				</SC.CommumityLikeRevieLayout>
			</SC.PostInnerContext>
		</SC.PostInnerItem>
	);
};
