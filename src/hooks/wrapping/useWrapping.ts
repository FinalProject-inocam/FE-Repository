import { useEffect, useState, useRef, useContext } from "react";
import * as RTK from '../../redux';
import { useRouter } from "../../hooks";
import { geolocationContext } from "../../pages";
import * as Type from "../../types"

// declare global {
//   interface Window {
//     kakao: any;
//   }
// }

export const useWrapping = ():Type.useWrapping => {

  const { onNavigate } = useRouter();
  const mapRef = useRef(null);
  const geolocation = useContext(geolocationContext)
  const [checkGeolocation, setCheckGeolocation] = useState<boolean>(true)
  const { isLoading, data, isSuccess, isError, error } = RTK.useGetWrappingQuery(geolocation, {
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
      data.forEach((setMarker: Type.WrappingShop) => {
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

  return {data, mapRef, isLoading, isSuccess, isError, error, onNavigate}
}