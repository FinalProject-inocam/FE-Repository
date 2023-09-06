import dayjs from "dayjs";
import * as Type from "../../types";

export const usePostingTime = (): Type.UsePostingTime => {
	const timehandle = (createdAt: string): string | undefined => {
		const dayjsDate = dayjs();
		const currentDate = dayjsDate.format().split("T")[0];
		const currentTime = dayjsDate.format().split("T")[1].split(".")[0].split("+")[0];
		const gaphour: number = dayjs(`${currentDate} ${currentTime}`).diff(dayjs(createdAt), "hour");
		let postingTime;
		if (gaphour < 1) {
			postingTime =
				dayjs(dayjsDate).diff(dayjs(createdAt), "minute") < 2
					? "방금 전"
					: `${dayjs(dayjsDate).diff(dayjs(createdAt), "minute")}분 전`;
		} else if (gaphour < 24) {
			postingTime = gaphour + "시간 전";
		} else {
			postingTime = dayjs(createdAt).format("YY.MM.DD");
		}
		return postingTime;
	};
	return timehandle;
};
