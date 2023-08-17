import React from "react";
import { WrappingShopReview } from "../../components/wrappingshop/WrappingShopReview";
import WrappingShopInfo from "../../components/wrappingshop/WrappingShopInfo";
import { useWrappingMap } from "../../hooks/wrapping/useWrappingMap";
import * as WS from "../../components/css/wrappingshop/wrappingwhopStyled";

export const WrappingDetail: React.FC = () => {
	const { mapRef, isLoading, isError, error } = useWrappingMap();

	if (isLoading) {
		return <div>... 로딩중</div>;
	}
	if (isError) {
		return <div>에러발생... {JSON.stringify(error)}</div>;
	}

	return (
		<WS.PageContainer>
			<WS.WrappingShopMapWrapper>
				<WS.WrappingShopMap ref={mapRef} />
			</WS.WrappingShopMapWrapper>
			<WS.PageOnSideContainer>
				<WS.PageOnSideWrapper>
					<WrappingShopInfo />
					<WrappingShopReview />
				</WS.PageOnSideWrapper>
			</WS.PageOnSideContainer>
		</WS.PageContainer>
	);
};
