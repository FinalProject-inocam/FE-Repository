import React from "react";
import * as Hooks from "../../hooks";
import * as SC from "../../components/css";
import * as CP from "../../components/wrappingshop";

export const WrappingDetail: React.FC = () => {
	const { mapRef, isLoading, data, isError, error } = Hooks.useWrappingDetail();

	if (isLoading) return <div>... 로딩중</div>;
	else if (isError) return <div>에러발생... {JSON.stringify(error)}</div>;
	else {
		return (
			<Hooks.WrappingDetailContext.Provider value={data}>
				<SC.DetailOutline $fd='column' $gap={30}>
					{/* KakaoMaps /---------------------------/ */}
					<SC.DetailKakaoMaps>
						<section ref={mapRef} />
						<SC.MapFadeBottom />
					</SC.DetailKakaoMaps>

					{/* DetailContent /-----------------------/ */}
					<SC.DetailContent $gap={20}>
						<CP.DetailInfoArea />
						<CP.DetailReviewArea />
					</SC.DetailContent>
				</SC.DetailOutline>
			</Hooks.WrappingDetailContext.Provider>
		);
	}
};
