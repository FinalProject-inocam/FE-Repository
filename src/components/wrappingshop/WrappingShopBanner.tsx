import React from "react";
import * as WS from "../../components/css/wrappingshop/wrappingwhopStyled";
import { useWrappingDetail } from "../../hooks";

export const WrappingShopBanner: React.FC = () => {
	const { data } = useWrappingDetail();

	return (
		<WS.BannerWrapper>
			<div>
				<div>
					<WS.MainBanner src={data.banner[0]} alt='main-banner' />
				</div>
			</div>
			<div>
				<div>
					<WS.SubBanner src={data.banner[1]} alt='main-banner' />
					<WS.SubBanner src={data.banner[2]} alt='main-banner' />
					<WS.SubBanner src={data.banner[3]} alt='main-banner' />
				</div>
			</div>
		</WS.BannerWrapper>
	);
};
