import React from "react";
import * as WS from "../css/wrappingshop/wrappingShopDetailStyled";
import { useWrappingDetail } from "../../hooks";
import { WrappingShopBannerProps } from "../../types";

export const WrappingShopBanner: React.FC<WrappingShopBannerProps> = ({ bannerNumber, $bannerSize }) => {
	const { data } = useWrappingDetail();

	return (
		<WS.BannerContainer>
			<WS.BannerWrapper $jc='space-between'>
				<WS.BannerItem $bannerSize={$bannerSize}>
					<WS.BannerImage src={data.banner[bannerNumber]} alt='main-banner' />
				</WS.BannerItem>
			</WS.BannerWrapper>
		</WS.BannerContainer>
	);
};
