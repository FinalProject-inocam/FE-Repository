import React from "react";
import { useWrappingMap } from "../../hooks/wrapping/useWrappingMap";
import * as SC from "../../components/css";
import * as CP from "../../components/wrappingshop";
import { useWrappingDetail } from "../../hooks";

export const WrappingDetail: React.FC = () => {
	const { isLoading, isError, error, data } = useWrappingDetail();
	const { mapRef } = useWrappingMap();
	console.log(data);

	if (isLoading) {
		return <div>... 로딩중</div>;
	}
	if (isError) {
		return <div>에러발생... {JSON.stringify(error)}</div>;
	}

	return (
		<SC.PageContainer>
			<SC.WrappingShopMapWrapper>
				<SC.WrappingShopMap ref={mapRef} />
			</SC.WrappingShopMapWrapper>
			<SC.PageOnSideContainer>
				<SC.PageOnSideWrapper>
					<CP.WrappingShopInfo />
					<CP.WrappingShopReview />
				</SC.PageOnSideWrapper>
			</SC.PageOnSideContainer>
		</SC.PageContainer>
	);
};
