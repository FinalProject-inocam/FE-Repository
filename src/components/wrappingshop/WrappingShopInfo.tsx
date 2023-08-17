import React from "react";
import { useWrappingDetail } from "../../hooks";
import * as SC from "../../components/css";
import * as CP from "../../components/wrappingshop";

export const WrappingShopInfo: React.FC = () => {
	const { data } = useWrappingDetail();
	return (
		<SC.LeftOnSide>
			<SC.WrappInfo>
				<CP.WrappingShopBanner bannerNumber={0} $bannerSize='big' />
				<SC.LeftContentWrapper>
					<SC.WrappingShopName>{data.shopName}</SC.WrappingShopName>
					<SC.WrappingShopAddress>{data.address}</SC.WrappingShopAddress>
				</SC.LeftContentWrapper>
				<SC.WrappingShopScore>
					<div>리뷰 {data.revieSC.length}</div>
					<div>좋아요{data.likeCount}개</div>
					<div>{data.avgStar.toFixed(1)}/5</div>
					{Array.from({ length: 5 }).map((_, index) => (
						<span key={index}>{index < data.avgStar ? "★" : "☆"}</span>
					))}
				</SC.WrappingShopScore>
			</SC.WrappInfo>
		</SC.LeftOnSide>
	);
};
