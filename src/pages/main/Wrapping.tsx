import React from "react";
import { styled } from "styled-components";
import * as Type from "../../types";
import { useWrapping } from "../../hooks";
// import * as SC from "../../components";

export const Wrapping: React.FC = () => {
  const { data, mapRef, isLoading, isSuccess, isError, error, onNavigate } =
    useWrapping();

  return (
    <div>
      <Section>
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

        {isLoading ? (
          <div>로딩중</div>
        ) : isError ? (
          <div>{JSON.stringify(error)}</div>
        ) : isSuccess && data ? (
          data.map((item: Type.WrappingShop) => (
            <ShopInfoContainer
              key={item.shopId}
              onClick={onNavigate && onNavigate(`${item.shopId}`)}
            >
              <ShopInfo>
                <div>{item.shopName}</div>
                <div>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <span key={index}>{index < item.avgStar ? "★" : "☆"}</span>
                  ))}
                </div>
              </ShopInfo>
              <div>
                <div>{item.rdnmAdr}</div>
              </div>
              <StyledHr />
            </ShopInfoContainer>
          ))
        ) : (
          <ShopInfoContainer>
            <div>데이터가 없습니다.</div>
          </ShopInfoContainer>
        )}
      </Section>
    </div>
  );
};

const Section = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const KakaoMap = styled.div`
  width: 100%;
  height: 650px;
`;

const ShopInfoContainer = styled.div`
  display: flex;
  position: absolute;

  top: 0px;
  left: 0px;

  height: 100%;
  width: 467px;

  z-index: 50; // 헤더 z-index 100보다 작게 줌
  flex-direction: column;

  gap: 10px;
  background-color: pink;
`;

const ShopInfo = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledHr = styled.hr`
  border: 0;
  border-top: 1px solid #ccc;
  margin: 10px 0;
`;
