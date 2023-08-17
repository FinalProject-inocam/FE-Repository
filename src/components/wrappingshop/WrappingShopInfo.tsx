import React from "react";
import { useWrappingDetail } from "../../hooks";
import * as WS from "../../components/css/wrappingshop/wrappingwhopStyled";
import { WrappingShopBanner } from "../../components/wrappingshop/WrappingShopBanner";

const WrappingShopInfo: React.FC = () => {
	const { data } = useWrappingDetail();
	return (
		<WS.LeftOnSide>
			<WS.WrappInfo>
				<WrappingShopBanner bannerNumber={0} $bannerSize='big' />
				<WS.LeftContentWrapper>
					<WS.WrappingShopName>{data.shopName}</WS.WrappingShopName>
					<WS.WrappingShopAddress>{data.address}</WS.WrappingShopAddress>
				</WS.LeftContentWrapper>
				<WS.WrappingShopScore>
					<div>리뷰 {data.reviews.length}</div>
					<div>좋아요{data.likeCount}개</div>
					<div>{data.avgStar.toFixed(1)}/5</div>
					{Array.from({ length: 5 }).map((_, index) => (
						<span key={index}>{index < data.avgStar ? "★" : "☆"}</span>
					))}
				</WS.WrappingShopScore>
			</WS.WrappInfo>
		</WS.LeftOnSide>
	);
};

export default WrappingShopInfo;
