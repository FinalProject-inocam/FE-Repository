import React, { createContext } from "react";
import * as Hooks from "../../hooks";
import * as Type from "../../types";
import * as SC from "../../components/css";
import * as CP from "../../components/wrappingshop";

export const WrappingDetailContext = createContext<Type.WrappingShopDetail | undefined | null>(null);

export const WrappingDetail: React.FC = () => {
	const { mapRef, isLoading, data, isError, error } = Hooks.useWrappingDetail();
	console.log(data);

	if (isLoading) return <div>... 로딩중</div>;
	else if (isError) return <div>에러발생... {JSON.stringify(error)}</div>;
	else {
		return (
			<WrappingDetailContext.Provider value={data}>
				<SC.DetailOutline $fd='column' $gap={30}>
					{/* KakaoMaps /---------------------------/ */}
					<SC.DetailKakaoMaps>
						<section ref={mapRef} />
						<SC.MapFadeBottom />
					</SC.DetailKakaoMaps>

					{/* DetailContent /-----------------------/ */}
					<SC.DetailContent $gtc={"467px 1fr"} $gap={20}>
						<CP.DetailInfoArea />
						<CP.DetailReviewArea />
					</SC.DetailContent>
				</SC.DetailOutline>
			</WrappingDetailContext.Provider>
		);
	}
};
