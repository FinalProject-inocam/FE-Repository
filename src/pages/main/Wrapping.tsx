import React from 'react';
import { styled } from 'styled-components';
import * as Type from '../../types';
import { useWrapping } from '../../hooks';


export const Wrapping: React.FC = () => {
  const { data, mapRef, isLoading, isSuccess, isError, error, onNavigate } = useWrapping()

  return (<div>
    <h1>Decoration</h1>
    <div
      ref={mapRef}
      style={{
        height: "600px",
        backgroundColor: 'orange',
        borderRadius: "20px",
        position: "relative"
      }}
    />

    {isLoading 
      ? <div>로딩중</div> 
      : isError 
        ? <div>{JSON.stringify(error)}</div> 
        : isSuccess && data 
          ? data.map((item: Type.WrappingShop) => (<ShopInfoContainer key={item.shopId} onClick={onNavigate && onNavigate(`${item.shopId}`)}>
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
            </ShopInfoContainer>))
        : <div>데이터가 없습니다.</div>}
  </div>)
  // }

};

const ShopInfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	margin: 20px;
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
