import dayjs from "dayjs";
import { MouseEvent, useState } from "react";
import { useGetPurchaseChartQuery, useGetUserChartQuery } from "../../redux";

export const useAdminDeshboard = (): any => {
	/* DataTypeSelect //------------------------------------------------- */
	const newDate = dayjs().format("YYYY-MM-DD");
	const [dataTypeSelect, setDataTypeSelect] = useState<boolean>(false);
	const [getType, setGetType] = useState<string[]>(["주간", "week"]);
	const [showPeriod, setShowPeriod] = useState<string>(
		`${dayjs().startOf("week").format("MM/DD")} ~ ${dayjs().endOf("week").format("MM/DD")}`
	);
	const [period, setPeriod] = useState<string>(newDate);
	const selectDate = dayjs();
	const [afterPeriodState, setAfterPeriodState] = useState<boolean>(false);

	const onChangeDataTypeSelect = () => {
		setDataTypeSelect((pre) => !pre);
	};

	const onPeriodSelect = (e: MouseEvent<HTMLDivElement>) => {
		const {
			dataset: { value },
		} = e.target as HTMLDivElement;

		const valueArr = value?.split(".");
		setGetType(valueArr as string[]);
		switch (valueArr && valueArr[1]) {
			case "week":
				setPeriod(selectDate.format("YYYY-MM-DD"));
				setShowPeriod(
					`${selectDate.startOf("week").format("MM/DD")} ~ ${selectDate.endOf("week").format("MM/DD")}`
				);
				return;
			case "month":
				setPeriod(selectDate.format("YYYY-MM"));
				setShowPeriod(
					`${selectDate.startOf("month").format("YY/MM/DD")} ~ ${selectDate.endOf("month").format("MM/DD")}`
				);
				return;
			default:
				setPeriod(selectDate.format("YYYY"));
				setShowPeriod(
					`${selectDate.startOf("year").format("YY.MM")} ~ ${selectDate.endOf("year").format("YY.MM")}`
				);
				return;
		}
	};

	const onBeforePeriod = () => {
		switch (getType[1]) {
			case "week":
				const minusWeek = dayjs(period).subtract(1, "week");
				setAfterPeriodState(true);
				setPeriod(minusWeek.format("YYYY-MM-DD"));
				setShowPeriod(
					`${minusWeek.startOf("week").format("MM/DD")} ~ ${minusWeek.endOf("week").format("MM/DD")}`
				);
				return;
			case "month":
				const minusMonth = dayjs(period).subtract(1, "month");
				setAfterPeriodState(true);
				setPeriod(minusMonth.format("YYYY-MM"));
				setShowPeriod(
					`${minusMonth.startOf("month").format("YY/MM/DD")} ~ ${minusMonth.endOf("month").format("MM/DD")}`
				);
				return;
			default:
				const minusYear = dayjs(period).subtract(1, "year");
				setAfterPeriodState(true);
				setPeriod(minusYear.format("YYYY"));
				setShowPeriod(
					`${minusYear.startOf("year").format("YY.MM")} ~ ${minusYear.endOf("year").format("YY.MM")}`
				);
				return;
		}
	};

	const onAfterPeriod = () => {
		switch (getType[1]) {
			case "week":
				if (selectDate.startOf("week") <= dayjs(period).startOf("week")) return;
				const minusWeek = dayjs(period).add(1, "week");
				const afterPeriodStateW =
					dayjs(period).add(2, "week").startOf("week").format("YYYY-MM-DD") <
					selectDate.startOf("week").format("YYYY-MM-DD");
				!afterPeriodStateW && setAfterPeriodState(false);
				setPeriod(minusWeek.format("YYYY-MM-DD"));
				setShowPeriod(
					`${minusWeek.startOf("week").format("MM/DD")} ~ ${minusWeek.endOf("week").format("MM/DD")}`
				);
				return;
			case "month":
				if (selectDate.startOf("month") <= dayjs(period).startOf("month")) return;
				const minusMonth = dayjs(period).add(1, "month");
				const afterPeriodStateM =
					dayjs(period).add(2, "month").startOf("month").format("YYYY-MM-DD") <
					selectDate.startOf("month").format("YYYY-MM-DD");
				!afterPeriodStateM && setAfterPeriodState(false);
				setPeriod(minusMonth.format("YYYY-MM"));
				setShowPeriod(
					`${minusMonth.startOf("month").format("YY/MM/DD")} ~ ${minusMonth.endOf("month").format("MM/DD")}`
				);
				return;
			default:
				if (selectDate.startOf("year") <= dayjs(period).startOf("year")) return;
				const minusYear = dayjs(period).add(1, "year");
				const afterPeriodStateY =
					dayjs(period).add(2, "year").startOf("year").format("YYYY-MM-DD") <
					selectDate.startOf("year").format("YYYY-MM-DD");
				!afterPeriodStateY && setAfterPeriodState(false);
				setPeriod(minusYear.format("YYYY"));
				setShowPeriod(
					`${minusYear.startOf("year").format("YY.MM")} ~ ${minusYear.endOf("year").format("YY.MM")}`
				);
				return;
		}
	};

	const onReduce = (data: number[]) => {
		return data.reduce((pre: number, cur: number) => pre + cur, 0)
	}

	/* ChartJS Opts //------------------------------------------------- */
	const dataRatioOpts = {
		plugins: {
			legend: {
				display: false,
			},
		},
	};

	const barChartOpts = {
		maxBarThickness: 20, // 막대의 최대 굵기 지정
		plugins: {
			legend: {
				display: false, // 레전드 가리기
			},
		},
		scales: {
			x: {
				// x축에 대한 설정을 지정
				grid: {
					display: false,
				},
				ticks: {
					// x축에 대한 폰트관련 설정
					font: {
						size: 9,
					},
				},
			},
			y: {
				// y축에 대한 설정을 지정
				grid: {
					color: "#DBDBFF", // y축에 대한 색상조정
				},
				afterDataLimits: (scale: any) => {
					scale.max = scale.max * 1.2;
				},
				title: {
					display: true,
					align: "end" as const,
					font: {
						size: 10,
					},
					text: "단위: 건",
				},
			},
		},
	};

	/* useGetUserChartQuery //------------------------------------------------- */
	const {
		isLoading: userLoading,
		data: userData,
		isError: userIsError,
		error: userError,
	} = useGetUserChartQuery(new Date().getFullYear());

	const userGenderRatio = {
		labels: ["남성", "여성", "알수없음"],
		datasets: [
			{
				data: userData && [
					userData.gender.ratio.MALE,
					userData.gender.ratio.FEMALE,
					userData.gender.ratio.UNKNOWN,
				],
				borderColor: ["rgba(76,76,255,0.3)", "rgba(252,85,85,0.3)", "rgba(130,130,149,0.3)"],
				backgroundColor: ["rgba(76,76,255,0.8)", "rgba(252,85,85,0.8)", "rgba(130,130,149,0.8)"],
			},
		],
	};

	const userAgeRatio = {
		labels: ["10~20대", "30대", "40대", "50대", "60대", "70대 이상"],
		datasets: [
			{
				data: userData && [
					userData.age.ratio["20"],
					userData.age.ratio["30"],
					userData.age.ratio["40"],
					userData.age.ratio["50"],
					userData.age.ratio["60"],
					userData.age.ratio["70+"],
				],
				borderColor: [
					"rgba(55,55,194,0.3)",
					"rgba(97,97,245,0.3)",
					"rgba(41,204,106,0.3)",
					"rgba(242,209,36,0.3)",
					"rgba(252,85,85,0.3)",
					"rgba(255,161,31,0.3)",
					"rgba(252,85,85,0.3)",
				],
				backgroundColor: [
					"rgba(55,55,194,0.8)",
					"rgba(97,97,245,0.8)",
					"rgba(41,204,106,0.8)",
					"rgba(242,209,36,0.8)",
					"rgba(252,85,85,0.8)",
					"rgba(255,161,31,0.8)",
					"rgba(252,85,85,0.8)",
				],
			},
		],
	};

	/* useGetPurchaseChartQuery //------------------------------------------------- */
	const {
		isLoading: purchaseLoading,
		data: purchaseData,
		isError: purchaseIsError,
		error: purchaseError,
	} = useGetPurchaseChartQuery({ type: getType[1], period });
	const purchaseReduce =
		purchaseData && (purchaseData.purchase.values.reduce((pre: number, cal: number) => pre + cal, 0) || 0);
	const approveReduce =
		purchaseData && (purchaseData.approve.values.reduce((pre: number, cal: number) => pre + cal, 0) || 0);
	const cancelReduce =
		purchaseData && (purchaseData.cancel.values.reduce((pre: number, cal: number) => pre + cal, 0) || 0);

	const purchaseRatio = {
		labels: ["신청", "확정", "취소"],
		datasets: [
			{
				data: [purchaseReduce, approveReduce, cancelReduce],
				borderColor: ["rgba(76,76,255,0.3)", "rgba(41,204,106,0.3)", "rgba(252,85,85,0.3)"],
				backgroundColor: ["rgba(76,76,255,0.8)", "rgba(41,204,106,0.8)", "rgba(252,85,85,0.8)"],
			},
		],
	};

	const purchaseLineData = {
		labels: purchaseData && purchaseData.purchase.labels,
		datasets: [
			{
				type: "bar" as const,
				data: purchaseData && purchaseData.purchase.values, // 신청
				borderColor: "rgba(76,76,255,0.3)",
				backgroundColor: "rgba(76,76,255,0.8)",
				borderRadius: 50,
			},
			{
				type: "bar" as const,
				data: purchaseData && purchaseData.approve.values, // 승인
				borderColor: "rgba(41,204,106,0.3)",
				backgroundColor: "rgba(41,204,106,0.8)",
				borderRadius: 50,
			},
			{
				type: "bar" as const,
				data: purchaseData && purchaseData.cancel.values, // 취소
				borderColor: "rgba(252,85,85,0.3)",
				backgroundColor: "rgba(252,85,85,0.8)",
				borderRadius: 50,
			},
		],
	};

	const purchaseGenderDonutData = {
		labels: purchaseData && purchaseData.gender.labels,
		datasets: [
			{
				data: purchaseData && purchaseData.gender.values,
				borderColor: ["rgba(76,76,255,0.3)", "rgba(252,85,85,0.3)", "rgba(130,130,149,0.3)"],
				backgroundColor: ["rgba(76,76,255,0.8)", "rgba(252,85,85,0.8)", "rgba(130,130,149,0.8)"],
			},
		],
	};

	const purchaseAgeDonutData = {
		labels: purchaseData && purchaseData.age.labels,
		datasets: [
			{
				data: purchaseData && [
					onReduce(purchaseData.age.values[0]),
					onReduce(purchaseData.age.values[1]),
					onReduce(purchaseData.age.values[2]),
					onReduce(purchaseData.age.values[3]),
					onReduce(purchaseData.age.values[4]),
					onReduce(purchaseData.age.values[5]),
				],
				borderColor: [
					"rgba(55,55,194,0.3)",
					"rgba(97,97,245,0.3)",
					"rgba(41,204,106,0.3)",
					"rgba(242,209,36,0.3)",
					"rgba(252,85,85,0.3)",
					"rgba(255,161,31,0.3)",
					"rgba(252,85,85,0.3)",
				],
				backgroundColor: [
					"rgba(55,55,194,0.8)",
					"rgba(97,97,245,0.8)",
					"rgba(41,204,106,0.8)",
					"rgba(242,209,36,0.8)",
					"rgba(252,85,85,0.8)",
					"rgba(255,161,31,0.8)",
					"rgba(252,85,85,0.8)",
				],
				tension: 0.5
			},
		],
	};


	return {
		getType,
		dataTypeSelect,
		showPeriod,
		afterPeriodState,
		onAfterPeriod,
		onPeriodSelect,
		onBeforePeriod,
		onChangeDataTypeSelect,
		userLoading,
		userIsError,
		userError,
		userData,
		purchaseLoading,
		purchaseIsError,
		purchaseError,
		purchaseData,

		// Chart
		onReduce,
		dataRatioOpts,
		barChartOpts,
		userGenderRatio,
		userAgeRatio,
		purchaseRatio,
		purchaseLineData,
		purchaseReduce,
		approveReduce,
		cancelReduce,
		purchaseGenderDonutData,
		purchaseAgeDonutData,
	};
};
