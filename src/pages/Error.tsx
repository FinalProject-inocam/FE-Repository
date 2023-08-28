import React, { useEffect, useRef } from "react";

export const Error: React.FC = () => {
	const errRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (errRef.current) {
			const style = errRef.current.style;
			style.height = `${window.innerHeight}px`;
			style.width = `${window.innerWidth}px`;
			style.position = "fixed";
			style.top = "0";
			style.left = "0";
			style.backgroundColor = "black";
		}
		// window.location.reload()
	}, []);
	return <div ref={errRef} />;
};
