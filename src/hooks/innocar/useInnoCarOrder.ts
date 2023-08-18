import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import * as Type from "../../types";
import { usePostPurchasesMutation } from "../../redux";

export const useInnoCarOrder = (): Type.UseInnoCarOrder => {
	const [carOrderInfo, setCarOrderInfo] = useState<Type.CarOrderInfo>({
		type: "",
		color: "",
		alarm: true,
		content: "",
		addressName: "",
		zoneNo: "",
	});

	const [openDaumPost, setOpenDaumPost] = useState<boolean>(false);

	const [onPostPurchase, query] = usePostPurchasesMutation();

	const onChangeCarOrderInfo = (e: ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		if (name === "alarm") {
			setCarOrderInfo({
				...carOrderInfo,
				[name]: value === "true" ? true : false,
			});
		} else {
			setCarOrderInfo({ ...carOrderInfo, [name]: value });
		}
	};

	const onSubmitCarOrder = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		// console.log(carOrderInfo);
		// console.log(typeof carOrderInfo.alarm);
		onPostPurchase(carOrderInfo);
	};

	const handleComplete = (data: any) => {
		console.log(data);

		setCarOrderInfo({
			...carOrderInfo,
			addressName: data.address ? data.address : data.jibunAddress,
			zoneNo: data.zonecode,
		});
		//address //address /없으면/ jibunAddress  // zonecode
	};

	useEffect(() => {
		query && console.log(query);
	}, [query]);

	return { carOrderInfo, openDaumPost, onSubmitCarOrder, onChangeCarOrderInfo, setOpenDaumPost, handleComplete };
};
