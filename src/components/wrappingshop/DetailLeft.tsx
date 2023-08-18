import React from "react";
import * as Type from "../../types";
import { FigureObjectFitImg } from "../atom";
import * as SC from "../../components/css";

export const DetailLeft: React.FC<Type.WrappingDetailProps> = ({ isLoading, data }) => {
	console.log(isLoading, data);
	if (isLoading) return <div>로딩 중....</div>;
	else
		return (
			<div style={{ backgroundColor: "red", position: "relative" }}>
				<div style={{ position: "absolute", transform: "translateY(-50%)", zIndex: "20" }}>
					<FigureObjectFitImg width={`466px`} height={`333px`} src={data.banner[0]} alt='SomeImg' />
				</div>
				<SC.LeftContentWrapper>
					<SC.WrappingShopName>{data.shopName}</SC.WrappingShopName>
					<SC.WrappingShopAddress>{data.address}</SC.WrappingShopAddress>
				</SC.LeftContentWrapper>
				<SC.WrappingShopScore>
					<div>리뷰 {data.reviews.length}</div>
					<div>좋아요{data.likeCount}개</div>
					<div>{data.avgStar.toFixed(1)}/5</div>
					{Array.from({ length: 5 }).map((_, index) => (
						<span key={index}>{index < data.avgStar ? "★" : "☆"}</span>
					))}
				</SC.WrappingShopScore>
			</div>
		);
};
