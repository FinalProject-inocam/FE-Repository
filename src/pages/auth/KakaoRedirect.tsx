import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRouter } from "../../hooks";
import { useLoginSNSRTKQuery } from "../../redux";

export const KakaoRedirect: React.FC = () => {
  const { search } = useLocation();
  console.log(search);
  const { onNavigate } = useRouter();
  const query = useLoginSNSRTKQuery({types:"kakao", code:search});

  useEffect(() => {
    console.log(query);
    // query.isSuccess && onNavigate("/")();
  }, [query, onNavigate]);
  return <div>KakaoRedirect</div>;
};
