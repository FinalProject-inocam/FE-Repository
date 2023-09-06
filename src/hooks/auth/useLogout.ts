import { useEffect, useState } from "react";
import * as RD from "../../redux";
// import * as Type from "../../types";

export const useLogout = (setState?: any): any => {
	const dispatch = RD.useAppDispatch();
	const [logout, setLogout] = useState<boolean>(true);
	const { isSuccess, data } = RD.useGetLogoutQuery({}, { skip: logout });
	const { sub } = RD.useAppSelector(RD.selectDecode);

	const onLogout = (): void => {
		setLogout((pre) => !pre);
		dispatch(RD.deleteToken());
		setState && setState((pre: boolean) => !pre);
	};
	useEffect(() => {
		setLogout(true);
		return () => {
			setLogout(true);
		};
	}, []);

	useEffect(() => {
		if (isSuccess) {
			document.cookie = `accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
			document.cookie = `refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
		}
	}, [isSuccess, data]);

	return { sub, onLogout };
};
