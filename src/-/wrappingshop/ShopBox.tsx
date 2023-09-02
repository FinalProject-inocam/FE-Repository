import { FC } from "react";
import * as SC from "../css";
import * as Type from "../../types";
import * as Hooks from "../../hooks";

export const ShopBox: FC<{ item: Type.ShopList }> = ({ item }) => {
	const { onNavigate } = Hooks.useRouter();
	return (
		<SC.ShopBoxLayout
			$fd='column'
			$ai='flex-start'
			$gap={4}
			key={item.shopId}
			onClick={onNavigate && onNavigate({ url: `${item.shopId}` })}>
			<SC.ShopName>{item.shopName}</SC.ShopName>
			<SC.ShopAdr>{item.rdnmAdr}</SC.ShopAdr>
			<SC.GridBox $rgap={4}>
				<div>
					{Array.from({ length: 5 }).map((_, index) => (
						<span key={index}>{index < item.avgStar ? "★" : "☆"}</span>
					))}
					<span style={{ fontWeight: "500", lineHeight: "1.5" }}>{item.avgStar?.toFixed(2)}</span>
				</div>
				<div>리뷰 {item.reviewCount} 개</div>
				<div>010-0000-0000</div>
				<div>
					<SC.ShopOpeningHours>휴무일 </SC.ShopOpeningHours>
					<span>연중무휴</span>
				</div>
			</SC.GridBox>
		</SC.ShopBoxLayout>
	);
};
