import React from "react";
import { useWrappingDetail } from "../../hooks";
import * as WS from "../../components/css/wrappingshop/wrappingwhopStyled";

const WrappingShopInfo: React.FC = () => {
	const { data } = useWrappingDetail();
	return (
		<WS.LeftOnSide>
			<WS.LeftContentWrapper>
				<div>
					<div>{data.shopName}</div>
					{Array.from({ length: 5 }).map((_, index) => (
						<span key={index}>{index < data.avgStar ? "★" : "☆"}</span>
					))}
					<div>{data.address}</div>
					<div>좋아요{data.likeCount}개</div>
				</div>
			</WS.LeftContentWrapper>
		</WS.LeftOnSide>
	);
};

export default WrappingShopInfo;
