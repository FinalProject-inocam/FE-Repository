import React from "react";
import * as Hooks from "../../hooks";
import * as SC from "../../components/css";
import * as CP from "../../components/wrappingshop";

export const WrappingDetail: React.FC = () => {
	const { isLoading, isError, error, data } = Hooks.useWrappingDetail();
	const { mapRef } = Hooks.useWrappingMap(data);
	console.log(isLoading, isError, error);

	if (isError) return <div>{JSON.stringify(error)}</div>; // <ErrorBoundary FallbackComponent={Error}>
	else
		return (
			<SC.DetailOutline $fd='column'>
				{/* 상단 지도영역 */}
				<SC.DetailKakaoMaps>
					<section ref={mapRef} />
				</SC.DetailKakaoMaps>
				<SC.DetailContent $gtc={"466px 1fr"} $gap={20}>
					<CP.DetailLeft isLoading={isLoading} data={data} />
					<CP.DetailRight isLoading={isLoading} data={data} />
				</SC.DetailContent>
			</SC.DetailOutline>
		);
};
