import React, { useContext, useEffect, useRef, useState } from 'react';
import { useGetWrappingShopQuery } from '../../redux';
import { geolocationContext } from '../MainRouter';
import { useRouter } from "../../hooks";
import { styled } from 'styled-components';
import * as Type from '../../types';

interface GetWrappingShop {
  avgStar: number
  isLike: boolean
  latitude: number
  like_count: number
  lnoAdr: string
  longitude: number
  rdnmAdr: string
  shopId: string
  shopName: string
}

export const Decoration: React.FC = () => {
  const { onNavigate } = useRouter();
  const mapRef = useRef(null);
  const geolocation = useContext(geolocationContext)
  const [checkGeolocation, setCheckGeolocation] = useState<boolean>(true)
  const { isLoading, data, isError } = useGetWrappingShopQuery(geolocation, {
    skip: checkGeolocation,
  });

  // 조건부 useGetWrappingShopQuery 요청을 위한 
  useEffect(() => {
    geolocation && geolocation.lat && setCheckGeolocation(false)
  }, [geolocation])

  const kakaoMaps = window.kakao.maps;

  const [getMaps, setMaps] = useState<any>(null)
  useEffect(() => {
    if (geolocation?.lat) {
      const options = {
        center: new kakaoMaps.LatLng(geolocation.lat, geolocation.long),
        level: 3,
      };
      const map = new kakaoMaps.Map(mapRef.current, options);
      setMaps(map)
    };
  }, [geolocation, mapRef, kakaoMaps])

  useEffect(() => {
    const imageSrc = require('../../assets/marker.png')
    if (data) {
      data.forEach((setMarker: GetWrappingShop) => {
        const imgSize = new kakaoMaps.Size(60, 60)
        const markerImage = new kakaoMaps.MarkerImage(imageSrc, imgSize)
        const markers = new kakaoMaps.Marker({
          map: getMaps,
          position: new kakaoMaps.LatLng(setMarker.latitude, setMarker.longitude),
          image: markerImage
        })

        const content = `
        <div style="height:auto; background-color:black; border:3px solid black; border-radius:20px; padding:10px;">
          <h1 style="color:white;">${setMarker.shopName}</h1>
          <p style="color:white;">만들어보자, 커스텀 오버레이</p>
        <div>  
        `

        const position = new kakaoMaps.LatLng(setMarker.latitude, setMarker.longitude)
        const customOverlay = new kakaoMaps.CustomOverlay({
          position,
          content,
          yAnchor: 2
        })
        kakaoMaps.event.addListener(markers, 'mouseover', () => { customOverlay.setMap(getMaps) })
        kakaoMaps.event.addListener(markers, 'mouseout', () => { customOverlay.setMap() })

      })
    }
  }, [data, getMaps, kakaoMaps.Marker, kakaoMaps.LatLng, kakaoMaps.Size, kakaoMaps.MarkerImage, kakaoMaps.CustomOverlay, kakaoMaps.event])

  useEffect(() => {
    geolocation && geolocation.lat && setCheckGeolocation(false);
  }, [geolocation]);
  console.log(data);

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>error</div>;


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
    {data &&
      data.map((item: Type.ShopDataType) => {
        return (
          <ShopInfoContainer key={item.shopId} onClick={onNavigate(`/decorationDetail/${item.shopId}`)}>
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
        );
      })}
  </div>)
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
