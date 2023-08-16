import { useEffect, useRef, useState } from "react";
import { useWrappingDetail } from "./useWrappingDetail";
import * as Type from "../../types";

export const useWrappingMap = (): Type.UseWrappingMap => {
	const { isLoading, isError, error, data } = useWrappingDetail();

	const mapRef = useRef(null);
	const kakaoMaps = window.kakao.maps;

	const [getMaps, setMaps] = useState<any>(null);

	useEffect(() => {
		if (data) {
			const options = {
				center: new kakaoMaps.LatLng(data.latitude, data.longitude),
				level: 1,
			};
			const map = new kakaoMaps.Map(mapRef.current, options);
			setMaps(map);
		}
	}, [kakaoMaps, data]);

	useEffect(() => {
		const imageSrc = require("../../assets/marker.png");
		if (data && getMaps) {
			const imgSize = new kakaoMaps.Size(60, 60);
			const markerImage = new kakaoMaps.MarkerImage(imageSrc, imgSize);
			const markers = new kakaoMaps.Marker({
				map: getMaps,
				position: new kakaoMaps.LatLng(data.latitude, data.longitude),
				image: markerImage,
			});

			const content = `
                <div style="height:auto; background-color:black; border:3px solid black; border-radius:20px; padding:10px;">
                    <h1 style="color:white;">${data.shopName}</h1>
                    <p style="color:white;">만들어보자, 커스텀 오버레이</p>
                </div>
            `;

			const position = new kakaoMaps.LatLng(data.latitude, data.longitude);
			const customOverlay = new kakaoMaps.CustomOverlay({
				position,
				content,
				yAnchor: 2,
			});

			kakaoMaps.event.addListener(markers, "mouseover", () => {
				customOverlay.setMap(getMaps);
			});
			kakaoMaps.event.addListener(markers, "mouseout", () => {
				customOverlay.setMap(null);
			});
		}
	}, [
		data,
		getMaps,
		kakaoMaps.Marker,
		kakaoMaps.LatLng,
		kakaoMaps.Size,
		kakaoMaps.MarkerImage,
		kakaoMaps.CustomOverlay,
		kakaoMaps.event,
	]);

	return { mapRef, isLoading, isError, error };
};
