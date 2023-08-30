import React from "react";
import * as Type from "../../types";
import * as SC from "../css";
import * as AS from "../../assets";
import * as CP from "../../components/wrappingshop";

export const WrappingContent: React.FC<Partial<Type.UseWrapping>> = ({
	isLoading,
	isSuccess,
	isError,
	error,
	data,
}) => {
	console.log("WraappingContent", data);

	return (
		<SC.ContentArea $ai='flex-start'>
			<SC.ContentLayout $fd='column' $jc='flex-start'>
				<SC.FlexBox $fd='column' $jc='space-between' $gap={50} style={{ paddingTop: "50px" }}>
					<div>
						<SC.WrappingTitle>내 주변에 총 {data && data?.length}개의 </SC.WrappingTitle>
						<SC.WrappingTitle>랩핑샵을 찾았어요!</SC.WrappingTitle>
					</div>

					<SC.WrappingSearchBox $fd='space between'>
						<SC.WrappingSearchInput />
						<SC.SearchIcon src={AS.searchIcon} alt='serchIcon' />
					</SC.WrappingSearchBox>
					<SC.WrappingSort>
						<SC.WrappingSortItem>인기순</SC.WrappingSortItem>
						<SC.WrappingSortItem>거리순</SC.WrappingSortItem>
					</SC.WrappingSort>
				</SC.FlexBox>

				<div>
					<SC.WrappingSortList>
						{isLoading ? (
							<div>로딩중</div>
						) : isError ? (
							<div>{JSON.stringify(error)}</div>
						) : isSuccess && data ? (
							data.map((item: Type.WrappingShop) => <CP.ShopBox item={item} />)
						) : (
							<div>
								<div>데이터가 없습니다.</div>
							</div>
						)}
					</SC.WrappingSortList>
				</div>
			</SC.ContentLayout>
		</SC.ContentArea>
	);
};
