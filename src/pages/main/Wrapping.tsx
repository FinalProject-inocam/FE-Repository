import React, { useEffect, useState } from "react";
import { useWrapping } from "../../hooks";
import * as SC from "../../components/css";
import * as CP from "../../components/wrappingshop";
import * as RTK from "../../redux";
import * as Hooks from "../../hooks";

export const Wrapping: React.FC = () => {
	Hooks.useGeolocation();
	const geolocation: any = RTK.useAppSelector(RTK.selectgeoLocation);

	const [checkGeolocation, setCheckGeolocation] = useState<boolean>(true);
	const { isLoading, data, isSuccess, isError, error } = RTK.useGetWrappingQuery(geolocation, {
		skip: checkGeolocation,
	});

	const { mapRef } = useWrapping({ data });

	useEffect(() => {
		geolocation && geolocation.lat && setCheckGeolocation(false);
	}, [geolocation]);

	return (
		<div>
			<SC.Section $gtc='460px 1fr'>
				{/* 1 랩핑샵 리스트  */}
				<CP.WrappingContent
					isLoading={isLoading}
					isSuccess={isSuccess}
					isError={isError}
					error={error}
					data={data}
				/>
				{/* 지도부분 */}
				<SC.KakaoMapFigure>
					<SC.KakaoMap ref={mapRef} />
				</SC.KakaoMapFigure>
			</SC.Section>
		</div>
	);
};
