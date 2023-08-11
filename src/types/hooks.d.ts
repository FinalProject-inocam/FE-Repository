import { MutableRefObject } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

export interface useGeolocation {
  lat:number
  long:number
}

export interface useKakaoMap {
  geolocation: Partial<useGeolocation> | null;
  mapRef: MutableRefObject<null | HTMLDivElement>;
  kakao:any
}