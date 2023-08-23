import React, { createContext } from "react";
import { useParams } from "react-router-dom";
import * as RTK from "../../redux";
import * as Hooks from "../../hooks";
import * as Type from "../../types";
import * as SC from "../../components/css";
import * as CP from "../../components/wrappingshop";

export const WrappingDetailContext = createContext<Type.WrappingShopDetail | null>(null);

export const WrappingDetail: React.FC = () => {
	//
	const { id: shopId } = useParams<{ id: string }>();
	// RTK - 랩핑샵 GET
	const { isLoading, data, isError, error } = RTK.useGetWrappingShopDetailQuery(shopId);
	const { mapRef } = Hooks.useWrappingMap(data);

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
						<div>테스트</div>
					</SC.DetailContent>
				</SC.DetailOutline>
			</WrappingDetailContext.Provider>
		);
	}
};

// <CP.DetailLeft data={data} />
// <CP.DetailRight data={data} />
// const { shopDetailIsLoading, shopDetailData, shopDetailIsError, shopDetailError } = Hooks.useWrappingDetailInfo();
