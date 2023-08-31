import { useCallback, useEffect, useRef, MutableRefObject, Dispatch, SetStateAction } from "react";

export const useInfinityThrottle = (
	setPage: Dispatch<SetStateAction<number>> | undefined,
	isFetching: boolean | undefined
): MutableRefObject<HTMLDivElement | null> => {
	const fetchNextRef = useRef<HTMLDivElement | null>(null);
	const RefetchThrottle = (callback: () => void, delay: number) => {
		let timeId: NodeJS.Timeout | null = null;
		return () => {
			if (timeId) return;
			callback();
			timeId = setTimeout(() => {
				timeId = null;
			}, delay);
		};
	};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const onNextPageCallback = useCallback(
		RefetchThrottle(() => {
			console.log("쓰로틀 시작");
			if (setPage) {
				setPage((pre: number) => pre + 1);
			}
		}, 500),
		[]
	);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && !isFetching) {
					// 마지막 요소가 감지되었을 때, 추가요청을 보내면, 값이 오겠죠.
					// console.log("Fetching more data...");
					onNextPageCallback();
				}
			},
			{ threshold: 0.1 } // 0~1, 0.1 뷰포트 요소(100px)의 10%(10px) 감지되었을 때, 동작한다.
		);

		if (fetchNextRef && fetchNextRef.current) {
			observer.observe(fetchNextRef.current); // 관찰대상 등록
		}
	}, [isFetching, onNextPageCallback]);

	return fetchNextRef;
};
