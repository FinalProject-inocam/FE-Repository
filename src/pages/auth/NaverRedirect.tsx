import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRouter } from "../../hooks";
import { useLoginSNSRTKQuery } from "../../redux";

export const NaverRedirect: React.FC = () => {
  const { search } = useLocation();
  const { onNavigate } = useRouter();
  const { isSuccess } = useLoginSNSRTKQuery({ types: "naver", code: search });

  useEffect(() => {
    isSuccess && onNavigate({ url:"-1" })();
  }, [isSuccess, onNavigate]);
  return <div />;
};
