import React from "react";
import * as SC from "../../-";
import * as ASS from "../../assets";
import { Outlet } from "react-router-dom";

export const Community: React.FC = () => {
	return (
		<SC.CommunityLayout>
			{/* 상단 이미지 공간 */}
			<SC.TopImgArticle>
				<SC.FigureObjectFitImg width='100%' height={"500px"} src={ASS.communityTopimg} alt='communityTopimg' />
				<SC.ArticleInner>
					<SC.TopImgLogo>
						<SC.FigureObjectFitImg width={"435px"} height={"122px"} src={ASS.mainLogo} alt='mainLogo' />
					</SC.TopImgLogo>
				</SC.ArticleInner>
			</SC.TopImgArticle>

			<SC.ArticleGrid $gtc='467px 1fr' $cgap={20}>
				{/* 좌측 인기최근 게시물 공간  */}
				<SC.GetPopularLists />
				{/* 우측 게시물 공간 */}
				<Outlet />
			</SC.ArticleGrid>
		</SC.CommunityLayout>
	);
};
