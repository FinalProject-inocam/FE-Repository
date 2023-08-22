import React from "react";
import * as Type from "../../types";
import * as SC from "../css";

export const DetailLeftShopInfo: React.FC<Type.WrappingDetailProps> = ({ data }) => {
	return (
		<SC.DetailLeftShopInfoLayout>
			<SC.WrappingShopName>{data.shopName}</SC.WrappingShopName>
			<SC.WrappingShopAddress>{data.address}</SC.WrappingShopAddress>
		</SC.DetailLeftShopInfoLayout>
	);
};
