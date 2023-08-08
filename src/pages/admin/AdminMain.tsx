import React, { MouseEvent, useState } from "react";
import { Chart } from "../../components";

export const AdminMain: React.FC = () => {
  const [getType, setGetType] = useState("getYears");

  const onGetData = (e: MouseEvent<HTMLButtonElement>) => {
    setGetType(e.currentTarget.innerText);
  };
  return (
    <div>
      <button onClick={onGetData}>getYears</button>
      <button onClick={onGetData}>getMonth</button>
      <button onClick={onGetData}>getWeek</button>
      <Chart getData={getType} />
    </div>
  );
};
