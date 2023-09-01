import { useEffect, useState, useRef } from "react";
import * as RTK from "../../redux";
import * as Type from "../../types";

export const useWrapping = ({ data, setPage }: any): Type.UseWrappingMap => {
	const dispatch = RTK.useAppDispatch();
	const mapRef = useRef<HTMLDivElement | null>(null);
	const geolocation: any = RTK.useAppSelector(RTK.selectgeoLocation);
	const kakaoMaps = window.kakao.maps;

	const [getMaps, setMaps] = useState<any>(null);
	const markers = useRef<any[]>([]);
	const overlays = useRef<any[]>([]);

	// Initialize Map
	useEffect(() => {
		if (!getMaps && mapRef.current && geolocation?.lat) {
			const options = {
				center: new kakaoMaps.LatLng(geolocation.lat, geolocation.long),
				level: 5,
			};
			const map = new kakaoMaps.Map(mapRef.current, options);

			setMaps(map);

			const dragendListener = kakaoMaps.event.addListener(map, "dragend", () => {
				const latlng = map.getCenter();
				dispatch(
					RTK.setGeoLocation({
						lat: latlng.getLat(),
						long: latlng.getLng(),
					})
				);
				dispatch(RTK.deleteShopList());
				setPage(1);
			});

			return () => {
				if (dragendListener) {
					kakaoMaps.event.removeListener(dragendListener);
				}
			};
		}
		// eslint-disable-next-line
	}, [geolocation]);

	// Update center when geolocation changes
	useEffect(() => {
		if (getMaps && geolocation?.lat) {
			const newCenter = new kakaoMaps.LatLng(geolocation.lat, geolocation.long);
			getMaps.setCenter(newCenter);
			getMaps.relayout();
		}
		// eslint-disable-next-line
	}, [geolocation, getMaps]);

	// Add Markers and Overlays
	useEffect(() => {
		const imageSrc = require("../../assets/marker.png");

		if (data && getMaps) {
			data.shopList.forEach((setMarker: Type.ShopList) => {
				const imgSize = new kakaoMaps.Size(60, 60);
				const markerImage = new kakaoMaps.MarkerImage(imageSrc, imgSize);
				const marker = new kakaoMaps.Marker({
					map: getMaps,
					position: new kakaoMaps.LatLng(setMarker.latitude, setMarker.longitude),
					image: markerImage,
				});

				markers.current.push(marker); // Store the marker

				const content = `
          <div style="height:auto; background-color:black; border:3px solid black; border-radius:20px; padding:10px;">
            <h1 style="color:white;">${setMarker.shopName}</h1>
            <p style="color:white;">만들어보자, 커스텀 오버레이</p>
          <div>
        `;

				const position = new kakaoMaps.LatLng(setMarker.latitude, setMarker.longitude);
				const customOverlay = new kakaoMaps.CustomOverlay({
					position,
					content,
					yAnchor: 2,
				});

				overlays.current.push(customOverlay); // Store the overlay

				kakaoMaps.event.addListener(marker, "mouseover", () => {
					customOverlay.setMap(getMaps);
				});

				kakaoMaps.event.addListener(marker, "mouseout", () => {
					customOverlay.setMap(null);
				});
			});
		}

		return () => {
			markers.current.forEach((marker) => marker.setMap(null));
			overlays.current.forEach((overlay) => overlay.setMap(null));
			markers.current = [];
			overlays.current = [];
		};
	}, [data, getMaps, kakaoMaps]);

	// Handle window resizing
	useEffect(() => {
		const setMaps = () => {
			if (mapRef.current) {
				mapRef.current.style.height = `${window.innerHeight}px`;
			}
		};

		setMaps();
		window.addEventListener("resize", setMaps);

		return () => {
			window.removeEventListener("resize", setMaps);
		};
	}, []);

	return { mapRef };
};
