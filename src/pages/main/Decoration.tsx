import React, { useContext, useEffect, useRef, useState } from "react";
import { useKakaoMap, useRouter } from "../../hooks";
import { useGetWrappingShopQuery } from "../../redux";
import { geolocationContext, kakoContext } from "../MainRouter";
import * as Type from "../../types/decoshop";
import { styled } from "styled-components";

export const Decoration: React.FC = () => {
	const { onNavigate } = useRouter();
	const mapRef = useRef(null);
	const geolocation = useContext(geolocationContext);
	const kakao = useContext(kakoContext);
	useKakaoMap({ geolocation, mapRef, kakao });
	const [checkGeolocation, setCheckGeolocation] = useState<boolean>(true);
	const { isLoading, data, isError } = useGetWrappingShopQuery(geolocation, {
		skip: checkGeolocation,
	});
	useEffect(() => {
		geolocation && geolocation.lat && setCheckGeolocation(false);
	}, [geolocation]);
	console.log(data);

	if (isLoading) return <div>로딩중...</div>;
	if (isError) return <div>error</div>;

	return (
		<div>
			<h1>Decoration</h1>
			<div
				ref={mapRef}
				style={{
					height: "500px",
					backgroundColor: "orange",
					borderRadius: "20px",
					position: "relative",
				}}
			/>
			{data &&
				data.map((item: Type.ShopDataType) => {
					return (
						<ShopInfoContainer key={item.shopId} onClick={onNavigate(`/decorationDetail/${item.shopId}`)}>
							<ShopInfo>
								<div>{item.shopName}</div>
								<div>
									{Array.from({ length: 5 }).map((_, index) => (
										<span key={index}>{index < item.avgStar ? "★" : "☆"}</span>
									))}
								</div>
							</ShopInfo>
							<div>
								<div>{item.rdnmAdr}</div>
							</div>
							<StyledHr />
						</ShopInfoContainer>
					);
				})}
		</div>
	);
};

const ShopInfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	margin: 20px;
`;

const ShopInfo = styled.div`
	display: flex;
	flex-direction: row;
`;

const StyledHr = styled.hr`
	border: 0;
	border-top: 1px solid #ccc;
	margin: 10px 0;
`;
