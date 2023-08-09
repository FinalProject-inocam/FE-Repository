import { useEffect } from "react";
import * as Type from "../../types/hooks";

export const useKakaoMap = ({geolocation, mapRef, kakao}:Type.useKakaoMap) => {  
  useEffect(() => {
    if (geolocation?.lat) {
      const options = {
        center: new kakao.maps.LatLng(geolocation.lat, geolocation.long),
        level: 3,
      };
      new window.kakao.maps.Map(mapRef.current, options);
    };
  }, [geolocation, kakao.maps.LatLng, mapRef])
}