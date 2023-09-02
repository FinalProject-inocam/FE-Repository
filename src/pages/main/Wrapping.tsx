import { FC, useEffect, useState } from "react";
import { useWrapping } from "../../hooks";
import * as SC from "../../-/css";
import * as CP from "../../-/wrappingshop";
import * as RTK from "../../redux";
import * as Hooks from "../../hooks";

export const Wrapping: FC = () => {
	Hooks.useGeolocation();
	const geolocation: any = RTK.useAppSelector(RTK.selectgeoLocation);
	const [page, setPage] = useState<number>(1);
	const [checkGeolocation, setCheckGeolocation] = useState<boolean>(true);
	const { isLoading, data, isSuccess, isFetching, isError, error } = RTK.useGetWrappingQuery(
		{ geolocation, page },
		{
			skip: checkGeolocation,
		}
	);

	const { mapRef } = useWrapping({ data, setPage });

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
					isFetching={isFetching}
					isError={isError}
					error={error}
					data={data}
					page={page}
					setPage={setPage}
				/>
				{/* 지도부분 */}
				<SC.KakaoMapFigure>
					<SC.KakaoMap ref={mapRef} />
				</SC.KakaoMapFigure>
			</SC.Section>
		</div>
	);
};
