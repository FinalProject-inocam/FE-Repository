import { useEffect } from "react";
import * as RTK from "../../redux";
import * as Type from "../../types";

export const useDecodeToken = (): Type.DecodeToken | {} => {
	const dispatch = RTK.useAppDispatch();
	const decodeToken = RTK.useAppSelector(RTK.selectDecode);
	useEffect(() => {
		const token =
			document.cookie &&
			document.cookie
				.split(";")
				.filter((cookies) => cookies.includes("refreshToken"))[0]
				?.split("=")[1];
		token && dispatch(RTK.setDecodeToken(token));
	}, [dispatch]);

	return decodeToken;
};
