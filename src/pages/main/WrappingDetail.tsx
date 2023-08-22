import React from "react";
import * as Hooks from "../../hooks";
import * as SC from "../../components/css";
import * as CP from "../../components/wrappingshop";

export const WrappingDetail: React.FC = () => {
	const { shopDetailIsLoading, shopDetailData, shopDetailIsError, shopDetailError } = Hooks.useWrappingDetailInfo();
	const { mapRef } = Hooks.useWrappingMap(shopDetailData);

	if (shopDetailIsError) return <div>{JSON.stringify(shopDetailError)}</div>;
	else
		return (
			<SC.DetailOutline $fd='column'>
				<SC.DetailKakaoMaps>
					<section ref={mapRef} />
					<SC.MapFadeBottom />
				</SC.DetailKakaoMaps>
				<SC.DetailContent $gtc={"467px 1fr"} $gap={20}>
					<CP.DetailLeft isLoading={shopDetailIsLoading} data={shopDetailData} />
					<CP.DetailRight isLoading={shopDetailIsLoading} data={shopDetailData} />
				</SC.DetailContent>
			</SC.DetailOutline>
		);
};
