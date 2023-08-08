import React, { useEffect } from "react";
import { useGetPurchasesCharQuery } from "../../redux";

export const Chart: React.FC<{ getData: string }> = ({ getData }) => {
  const { isLoading, isSuccess, isError, error, data } =
    useGetPurchasesCharQuery(getData);

  useEffect(() => {
    isSuccess && console.log(data);
    isError && console.log(error);
  }, [isSuccess, data, isError, error]);

  if (isLoading) return <div>로딩중</div>;
  return <div>Chart</div>;
};
