import React from "react";

import * as SC from "../../components/css";
import * as CP from "../../components/wrappingshop";

export const WrappingShopReview: React.FC = () => {
	return (
		<SC.RightOnSide>
			<SC.BannerWrapper>
				<CP.WrappingShopBanner bannerNumber={1} $bannerSize='small' />
				<CP.WrappingShopBanner bannerNumber={2} $bannerSize='small' />
				<CP.WrappingShopBanner bannerNumber={3} $bannerSize='small' />
			</SC.BannerWrapper>
		</SC.RightOnSide>
	);
};
