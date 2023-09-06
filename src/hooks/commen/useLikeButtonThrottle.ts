import { useCallback } from "react";

export const useLikeButtonThrottle = (callback: () => void, delay: number) => {
	const handleThrottle = (callback: () => void, delay: number) => {
		let timeId: NodeJS.Timeout | null = null;

		return () => {
			if (timeId) return;
			callback();
			timeId = setTimeout(() => {
				timeId = null;
			}, delay);
		};
	};

	const onThrottle = useCallback(handleThrottle(callback, delay), [callback, delay]);
	return onThrottle;
};
