import React, { useContext, useEffect, useRef, useState } from 'react';
import { useKakaoMap } from '../../hooks';
import { useGetWrappingShopQuery } from '../../redux';
import { geolocationContext, kakoContext } from '../MainRouter';

export const Decoration: React.FC = () => {
  const mapRef = useRef(null);
  const geolocation = useContext(geolocationContext)
  const kakao = useContext(kakoContext)  
  useKakaoMap({ geolocation, mapRef, kakao })
  const [checkGeolocation, setCheckGeolocation] = useState<boolean>(true)
  const query = useGetWrappingShopQuery(geolocation, {
    skip: checkGeolocation,
  })
  useEffect(()=> {
    geolocation && geolocation.lat && setCheckGeolocation(false)
  },[geolocation])
  console.log(query);
  
  return (<div>
    <h1>Decoration</h1>
    <div
      ref={mapRef}
      style={{
        height: "500px",
        backgroundColor: 'orange', 
        borderRadius: "20px",
        position: "relative"
      }}
    />
  </div>)
};


/*
avgStar
: 
0
isLike
: 
false
latitude
: 
37.5742574576634
like_count
: 
0
lnoAdr
: 
"서울특별시 종로구 사직동 263"
longitude
: 
126.965829352164
rdnmAdr
: 
"서울특별시 종로구 사직로 57-1"
shopId
: 
"MA010120220800003499"
shopName
: 
"기아오토큐"
*/ 