import { FC, useEffect, useState } from "react";
import * as Type from "../../types";
import * as SC from "../css";
// import * as AS from "../../assets";
import * as CP from ".";
import * as Hooks from "../../hooks";
import * as RTK from "../../redux";

export const WrappingContent: FC<Partial<Type.UseWrapping>> = ({
	isLoading,
	isSuccess,
	isFetching,
	isError,
	error,
	data,
	page,
	setPage,
}) => {
	const fetchNextRef = Hooks.useInfinityThrottle(setPage, isFetching);

	const dispatch = RTK.useAppDispatch();
	const getMergeData = RTK.useAppSelector(RTK.selectShopList);
	const [innerSize, setInnerSize] = useState<boolean>(false);
	useEffect(() => {
		const onListSize = () => {
			window.innerHeight <= 890 ? setInnerSize(true) : setInnerSize(false);
		};
		onListSize();
		window.addEventListener("resize", onListSize);
		return () => {
			window.removeEventListener("resize", onListSize);
		};
	}, []);

	useEffect(() => {
		if (isSuccess) {
			// page 1
			if (page === 1) {
				dispatch(RTK.deleteShopList());
				dispatch(RTK.setShopList(data?.shopList ?? []));
			} else {
				dispatch(RTK.mergeShopList(data?.shopList ?? []));
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	return (
		<SC.ContentArea $ai='flex-start'>
			<SC.ContentLayout $fd='column' $jc='flex-start' $gap={50}>
				<SC.FlexBox
					$fd='column'
					$jc='space-between'
					$gap={50}
					style={{ paddingTop: "50px", display: innerSize ? "none" : "block" }}>
					<div style={{ width: "100%" }}>
						<SC.WrappingTitle>
							내 주변에 총 {getMergeData && getMergeData?.shopList.length}개의{" "}
						</SC.WrappingTitle>
						<SC.WrappingTitle>랩핑샵을 찾았어요!</SC.WrappingTitle>
					</div>
				</SC.FlexBox>
				{/* {innerSize && (
					<div style={{ height: "50px" }}>{getMergeData && getMergeData?.shopList.length}개의 랩핑샵</div>
				)} */}

				<div>
					{innerSize && (
						<SC.FlexBox $ai='flex-end' $jc='flex-end' style={{ height: "70px", fontWeight: "500" }}>
							{getMergeData && getMergeData?.shopList.length}개의 랩핑샵
						</SC.FlexBox>
					)}
					<SC.WrappingSortList>
						{isLoading ? (
							<div>로딩중</div>
						) : isError ? (
							<div>{JSON.stringify(error)}</div>
						) : isSuccess && data?.shopList ? (
							getMergeData.shopList.map((item: Type.ShopList, idx: number) => (
								<CP.ShopBox key={idx} item={item} />
							))
						) : (
							<div>데이터가 없습니다.</div>
						)}
						<div style={{ height: "30px" }} ref={fetchNextRef}></div>
					</SC.WrappingSortList>
				</div>
			</SC.ContentLayout>
		</SC.ContentArea>
	);
};
