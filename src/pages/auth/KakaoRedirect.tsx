import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRouter } from "../../hooks";
import { useLoginSNSRTKQuery } from "../../redux";

export const KakaoRedirect: React.FC = () => {
  const { search } = useLocation();
  console.log(search);
  const { onNavigate } = useRouter();
  const { isSuccess } = useLoginSNSRTKQuery({ types: "kakao", code: search });

  useEffect(() => {
    isSuccess && onNavigate({ url:"-1" })();
  }, [isSuccess, onNavigate]);
  return <div />;
};
