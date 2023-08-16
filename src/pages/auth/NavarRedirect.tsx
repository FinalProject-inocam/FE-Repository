import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRouter } from "../../hooks";
import { useLoginSNSRTKQuery } from "../../redux";

export const NavarRedirect: React.FC = () => {
  const { search } = useLocation();
  const { onNavigate } = useRouter();
  const query = useLoginSNSRTKQuery({types:"naver", code:search});

  useEffect(() => {
    console.log(query);
    // query.isSuccess && onNavigate("/")();
  }, [query, onNavigate]);
  return <div />;
};
