import { FC } from "react";
import * as SC from "../css";
import * as AT from "../atom";
import * as ASS from "../../assets";
import * as RTK from "../../redux";
import * as Hooks from "../../hooks";

export const GetPopularLists: FC = () => {
	const { onNavigate } = Hooks.useRouter();
	const { isSuccess, isLoading, data, isError, error } = RTK.useGetCommunitesListQuery({});
	const { likeList, recentList, newImgUrl } = data !== undefined && data;

	const navigateHandler = (list: number) => () => {
		onNavigate({ url: `/community/review/${list}` })();
	};

	return (
		<div>
			<SC.PopularLayoutGrid $gtc='repeat(1, 1fr)' $gtr='350px 350px 220px'>
				{["인기게시물", "최근게시물"].map((content: string, idx: number) => (
					<SC.PostingList key={content}>
						<SC.CustomH1 $size={1.5}>{content}</SC.CustomH1>
						<SC.PostingBox>
							{isLoading ? (
								<div>로딩중</div>
							) : isError ? (
								<div>에러... {JSON.stringify(error)}</div>
							) : isSuccess && idx === 0 ? (
								recentList.map((list: any) => (
									<SC.GridBox key={list.postId} $gtc='30px 1fr 100px' $cgap={25}>
										<SC.RankNum
											$bColor={list.rank === 1 ? "blue" : "lightgray2"}
											children={
												<SC.CustomP
													$bColor={list.rank === 1 ? "blue" : "lightgray2"}
													children={list.rank}
												/>
											}
										/>
										<SC.PostingText
											$types='shortening'
											$color={list.rank === 1 ? "lightgray3" : "lightgray2"}
											children={<p children={list.title} />}
											onClick={navigateHandler(list.postId)}
										/>
										<SC.PostingText
											$color='lightgray2'
											$tAlign='end'
											children={<p children={list.createdAt.split("T")[0]} />}
										/>
									</SC.GridBox>
								))
							) : (
								isSuccess &&
								likeList.map((list: any) => (
									<SC.GridBox key={list.postId} $gtc='30px 1fr 100px' $cgap={25}>
										<SC.RankNum
											$bColor={list.rank === 1 ? "blue" : "lightgray2"}
											children={
												<SC.CustomP
													$bColor={list.rank === 1 ? "blue" : "lightgray2"}
													children={list.rank}
												/>
											}
										/>
										<SC.PostingText
											$types='shortening'
											$color={list.rank === 1 ? "lightgray3" : "lightgray2"}
											children={<p children={list.title} />}
											onClick={navigateHandler(list.postId)}
										/>
										<SC.PostingText
											$color='lightgray2'
											$tAlign='end'
											children={<p children={list.createdAt.split("T")[0]} />}
										/>
									</SC.GridBox>
								))
							)}
						</SC.PostingBox>
					</SC.PostingList>
				))}
				<SC.PositionRelavite $types='cursor'>
					<AT.FigureObjectFitImg
						types='communityNewCar'
						width={"100%"}
						height={"220px"}
						src={newImgUrl ? newImgUrl : ASS.communityBanner}
						alt='maicommunityNewCarnLogo'
					/>
					<SC.BannerText children='오늘의 신차' />
				</SC.PositionRelavite>
			</SC.PopularLayoutGrid>
		</div>
	);
};
