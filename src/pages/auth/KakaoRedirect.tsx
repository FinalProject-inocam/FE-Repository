import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
// import { useRouter } from "../../hooks";
import {
  selectLocation,
  useAppSelector,
  useLoginSNSRTKQuery,
} from "../../redux";

export const KakaoRedirect: React.FC = () => {
  const { search } = useLocation();
  const getLocation = useAppSelector(selectLocation);
  console.log("getLocation", getLocation)
  console.log(search);
  // const { onNavigate } = useRouter();
  const { isSuccess } = useLoginSNSRTKQuery({ types: "kakao", code: search });


  useEffect(() => {
    isSuccess && console.log(getLocation);
  }, [isSuccess, getLocation]);
  return <div />;
};
