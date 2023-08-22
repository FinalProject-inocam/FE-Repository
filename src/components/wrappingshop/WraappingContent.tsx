import React from "react";
import * as Type from "../../types";
import { useRouter } from "../../hooks";
import * as SC from "../../components/css";

export const WraappingContent: React.FC<Partial<Type.UseWrapping>> = ({
  isLoading,
  isSuccess,
  isError,
  error,
  data,
}) => {
  const { onNavigate } = useRouter();
  console.log("WraappingContent", data);

  const searchIcon = (
    <svg
      clipRule="evenodd"
      fillRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m15.97 17.031c-1.479 1.238-3.384 1.985-5.461 1.985-4.697 0-8.509-3.812-8.509-8.508s3.812-8.508 8.509-8.508c4.695 0 8.508 3.812 8.508 8.508 0 2.078-.747 3.984-1.985 5.461l4.749 4.75c.146.146.219.338.219.531 0 .587-.537.75-.75.75-.192 0-.384-.073-.531-.22zm-5.461-13.53c-3.868 0-7.007 3.14-7.007 7.007s3.139 7.007 7.007 7.007c3.866 0 7.007-3.14 7.007-7.007s-3.141-7.007-7.007-7.007z"
        fillRule="nonzero"
      />
    </svg>
  );

  return (
    <SC.ContentArea>
      <SC.ContentLayout>
        <SC.WrappingTitle>
          내 주변에 총 {data && data?.length}개의 랩핑샵을 찾았어요!
        </SC.WrappingTitle>
        <SC.WrappingSearchBox>
          <SC.WrappingSearchInput />
          <SC.SearchIcon>{searchIcon}</SC.SearchIcon>
        </SC.WrappingSearchBox>
        <div>
          <SC.WrappingSort>
            <SC.WrappingSortItem>인기순</SC.WrappingSortItem>
            <SC.WrappingSortItem>거리순</SC.WrappingSortItem>
          </SC.WrappingSort>

          <SC.WrappingSortList>
            {isLoading ? (
              <div>로딩중</div>
            ) : isError ? (
              <div>{JSON.stringify(error)}</div>
            ) : isSuccess && data ? (
              data.map((item: Type.WrappingShop) => (
                <div
                  key={item.shopId}
                  onClick={onNavigate && onNavigate({ url: `${item.shopId}` })}
                >
                  <SC.ShopInfo>
                    <div>{item.shopName}</div>
                    <div>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <span key={index}>
                          {index < item.avgStar ? "★" : "☆"}
                        </span>
                      ))}
                    </div>
                  </SC.ShopInfo>
                  <div>
                    <div>{item.rdnmAdr}</div>
                  </div>
                  <hr />
                </div>
              ))
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
