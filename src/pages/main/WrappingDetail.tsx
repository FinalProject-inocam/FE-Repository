import React from "react";
import * as Hooks from "../../hooks";
import * as SC from "../../components/css";
import * as CP from "../../components/wrappingshop";

export const WrappingDetail: React.FC = () => {
	const { isLoading, isError, error, data } = Hooks.useWrappingDetail();
	const { mapRef } = Hooks.useWrappingMap(data);

	if (isError) return <div>{JSON.stringify(error)}</div>;
	else
		return (
			<SC.DetailOutline $fd='column'>
				<SC.DetailKakaoMaps>
					<section ref={mapRef} />
					{/* <SC.MapFadeBottom /> */}
				</SC.DetailKakaoMaps>
				<SC.DetailContent $gtc={"466px 1fr"} $gap={20}>
					<CP.DetailLeft isLoading={isLoading} data={data} />
					<CP.DetailRight isLoading={isLoading} data={data} />
				</SC.DetailContent>
			</SC.DetailOutline>
		);
};
