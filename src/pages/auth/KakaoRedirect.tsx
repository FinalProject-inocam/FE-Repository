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
  console.log(search);
  // const { onNavigate } = useRouter();
  const { isSuccess } = useLoginSNSRTKQuery({ types: "kakao", code: search });
  const getLocation = useAppSelector(selectLocation);

  useEffect(() => {
    isSuccess && console.log(getLocation);
  }, [isSuccess, getLocation]);
  return <div />;
};
