import React, { MouseEvent, useState } from "react";
import { Chart } from "../../components";
import { useGetpurchasesChartYQuery } from "../../redux";

export const AdminMain: React.FC = () => {
  const [getType, setGetType] = useState("getYears");
  console.log(getType);

  const onGetData = (e: MouseEvent<HTMLButtonElement>) => {
    setGetType(e.currentTarget.innerText);
  };

  const query = useGetpurchasesChartYQuery("2023-08-19")
  console.log(query)

  return (
    <div>
      <button onClick={onGetData}>getYears</button>
      <button onClick={onGetData}>getMonth</button>
      <button onClick={onGetData}>getWeek</button>
      <Chart />
    </div>
  );
};
