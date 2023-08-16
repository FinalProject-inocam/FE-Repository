import { useEffect, useState } from "react";
import * as Type from "../../types/hooks/hooks";

export const useGeolocation = () => {
  const [geolocation, setGeolocation] = useState<Partial<Type.useGeolocation>>({});

  useEffect(() => {
    setTimeout(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setGeolocation({
            lat: position.coords.latitude,
            long: position.coords.longitude,
          });
        },
          // navigator.geolocation 이 차단되었을 때 
          () => {
            setGeolocation({
              lat: 37.5665,
              long: 126.9780
            }
            );
          })
      }
    }, 4000)
  }, []);

  return geolocation
}