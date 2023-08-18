import { useParams, useNavigate } from "react-router-dom";
import * as Type from "../types";

export const useRouter = (): Type.UseRouter => {
	const { id } = useParams();
	const getId: number | undefined = id ? +id : undefined;
	const navigate = useNavigate();
	const onNavigate = (path: string | number) => () => {
		if (typeof path === "string") {
			navigate(path);
		} else {
			navigate(path);
		}
	};
	return { getId, onNavigate };
};
