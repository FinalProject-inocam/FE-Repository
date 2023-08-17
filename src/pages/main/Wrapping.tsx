import React from "react";
import { styled } from "styled-components";
import * as Type from "../../types";
import { useWrapping } from "../../hooks";
import { Flex, Grid, theme } from "../../components";
// import * as SC from "../../components";

export const Wrapping: React.FC = () => {
  const { data, mapRef, isLoading, isSuccess, isError, error, onNavigate } =
    useWrapping();
  console.log(data, mapRef, isLoading, isSuccess, isError, error, onNavigate);
  const searchIcon = (
    <svg
      clip-rule="evenodd"
      fill-rule="evenodd"
      stroke-linejoin="round"
      stroke-miterlimit="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m15.97 17.031c-1.479 1.238-3.384 1.985-5.461 1.985-4.697 0-8.509-3.812-8.509-8.508s3.812-8.508 8.509-8.508c4.695 0 8.508 3.812 8.508 8.508 0 2.078-.747 3.984-1.985 5.461l4.749 4.75c.146.146.219.338.219.531 0 .587-.537.75-.75.75-.192 0-.384-.073-.531-.22zm-5.461-13.53c-3.868 0-7.007 3.14-7.007 7.007s3.139 7.007 7.007 7.007c3.866 0 7.007-3.14 7.007-7.007s-3.141-7.007-7.007-7.007z"
        fill-rule="nonzero"
      />
    </svg>
  );
  return (
    <div>
      <Section $gtc="467px 1fr">
        <ContentArea>
          <ContentLayout>
            <WrappingTitle>
              내 주변에 총 {data && data?.length}개의 랩핑샵을 찾았어요!
            </WrappingTitle>

            <WrappingSearchBox>
              <WrappingSearchInput />
              <SearchIcon>{searchIcon}</SearchIcon>
            </WrappingSearchBox>
            <div>
              <WrappingSort>
                <WrappingSortItem>인기순</WrappingSortItem>
                <WrappingSortItem>거리순</WrappingSortItem>
              </WrappingSort>

              <WrappingSortList>
                {isLoading ? (
                  <div>로딩중</div>
                ) : isError ? (
                  <div>{JSON.stringify(error)}</div>
                ) : isSuccess && data ? (
                  data.map((item: Type.WrappingShop) => (
                    <div
                      key={item.shopId}
                      onClick={onNavigate && onNavigate(`${item.shopId}`)}
                    >
                      <ShopInfo>
                        <div>{item.shopName}</div>
                        <div>
                          {Array.from({ length: 5 }).map((_, index) => (
                            <span key={index}>
                              {index < item.avgStar ? "★" : "☆"}
                            </span>
                          ))}
                        </div>
                      </ShopInfo>
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
              </WrappingSortList>
            </div>
          </ContentLayout>
        </ContentArea>
        <figure
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <KakaoMap ref={mapRef} />
        </figure>
      </Section>
    </div>
  );
};

const Section = styled.div<Partial<Type.Styled>>`
  ${Grid}
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const KakaoMap = styled.div<Partial<Type.Styled>>`
  width: 100%;
  min-height: 650px;
`;

//하얀색, 전체
const ContentArea = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: ${theme.color.white};
  z-index: 50;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

//컨텐트가 들어가는 부분
const ContentLayout = styled.div`
  margin-top: 140px;
  width: 345px;
  display: flex;
  flex-direction: column;
  gap: 50px;
  background-color: skyblue;
`;

const WrappingTitle = styled.div`
  ${theme.font.PretendardM};
  ${theme.color.blackM}
  text-align: text;
  font-size: 37px;
  font-weight: 500;
  background-color: pink;
  //size, weight 추후 수정
`;

const WrappingSearchBox = styled.div`
  background-color: white;
  border: 1px solid rgb(18, 0, 125); // 일단 기본으로 해놓음
  border-radius: 5px; // 이것도 일단 해놓음...
  height: 50px;
  width: 100%;
  padding: 0px 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const WrappingSearchInput = styled.input`
  ${theme.font.PretendardR}
  font-size: 16px;
  display: flex;
  align-items: center;
  width: 100%;
  border: none;
  outline: none;
`;

const SearchIcon = styled.div`
  width: 30px;
  height: 30px;
`;

//리스트
const ShopInfo = styled.div`
  display: flex;
  flex-direction: row;
`;

// 인기순, 거리순
const WrappingSort = styled.div`
  display: flex;
  width: 100%;
  height: 42px;
  padding-bottom: 20px;
`;

const WrappingSortItem = styled.div`
  ${Flex}
  width: 63px;
  height: 100%;
`;

const WrappingSortList = styled.div`
  width: 100%;
  height: 300px;
  overflow: auto;
`;

// const ShopInfoContainer = styled.div`
//   display: flex;
//   position: absolute;

//   top: 0px;
//   left: 0px;

//   height: 100%;
//   width: 467px;

//   z-index: 50; // 헤더 z-index 100보다 작게 줌
//   flex-direction: column;

//   gap: 10px;
//   background-color: pink;
// `;
