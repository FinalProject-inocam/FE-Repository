import React, { MouseEvent, useState } from "react";
import { Chart } from "../../components";
import { useGetpurchasesChartYQuery } from "../../redux";
import * as Hooks from "../../hooks";

export const AdminMain: React.FC = () => {
  Hooks.useDecodeDispatch();
  const { sub } = Hooks.useLogout();
  console.log(sub)
  const [getType, setGetType] = useState("getYears");

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
      <Chart getData={getType} />
    </div>
  );
};
