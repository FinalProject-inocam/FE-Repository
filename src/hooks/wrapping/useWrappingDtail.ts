import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import * as RTK from "../../redux";

export const useWrappingDetail = () => {
	// 로직...
	const { id: shopId } = useParams<{ id: string }>();
	const { isLoading, data, isError, error } = RTK.useGetWrappingShopDetailQuery(shopId);

	const mapRef = useRef(null);
	const kakaoMaps = window.kakao.maps;
	const [getMaps, setMaps] = useState<any>(null);

	// 지도 좌표 위치
	useEffect(() => {
		if (data) {
			const options = {
				center: new kakaoMaps.LatLng(data.latitude, data.longitude),
				level: 2,
				draggable: false,
				scrollwheel: false,
			};
			const map = new kakaoMaps.Map(mapRef.current, options);
			setMaps(map);
		}
	}, [kakaoMaps, data]);

	// 지도 마커
	useEffect(() => {
		const imageSrc = require("../../assets/marker.png");
		if (data && getMaps) {
			const imgSize = new kakaoMaps.Size(60, 60);
			const markerImage = new kakaoMaps.MarkerImage(imageSrc, imgSize);
			new kakaoMaps.Marker({
				map: getMaps,
				position: new kakaoMaps.LatLng(data.latitude, data.longitude),
				image: markerImage,
			});
		}
	}, [data, getMaps, kakaoMaps.Marker, kakaoMaps.LatLng, kakaoMaps.Size, kakaoMaps.MarkerImage]);

	// 좌표를 중심으로 지도의 위치 고정: 반응형에 대응
	useEffect(() => {
		if (getMaps && data) {
			const center = new kakaoMaps.LatLng(data.latitude, data.longitude);
			getMaps.setCenter(center);

			const handleResize = () => {
				getMaps.setCenter(center);

				const width = window.innerWidth;
				if (width > 1200) {
					getMaps.setLevel(2);
				} else if (width > 800) {
					getMaps.setLevel(4);
				} else {
					getMaps.setLevel(5);
				}
			};

			window.addEventListener("resize", handleResize);

			return () => {
				window.removeEventListener("resize", handleResize);
			};
		}
	}, [getMaps, kakaoMaps.LatLng, data]);

	return { mapRef, isLoading, data, isError, error };
};
