import { useEffect } from "react";
import * as RD from "../../redux";
import { useRouter } from "../useRouter";

export const useDecodeDispatch = () => {
	const {pathname} = useRouter()
	const refreshToken = document.cookie
		.split(";")
		.filter((cookies) => cookies.includes("refreshToken"))[0]
		?.split("=")[1];
	const dispatch = RD.useAppDispatch();
	
	useEffect(() => {
		refreshToken && dispatch(RD.setDecodeToken(refreshToken));
	}, [refreshToken, dispatch, pathname]);
};
