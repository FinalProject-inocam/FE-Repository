import { useEffect } from "react";
import * as RTK from "../../redux";

export const useGeolocation = () => {
	const dispatch = RTK.useAppDispatch();
	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					dispatch(
						RTK.setGeoLocation({
							lat: position.coords.latitude,
							long: position.coords.longitude,
						})
					);
				},

				// navigator.geolocation 이 차단되었을 때
				() => {
					dispatch(
						RTK.setGeoLocation({
							lat: 37.5665,
							long: 126.978,
						})
					);
				}
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
};
