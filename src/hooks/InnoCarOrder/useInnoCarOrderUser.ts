import { ChangeEvent, useState } from "react";
import * as Type from "../../types";

export const useInnoCarOrderUser = (): any => {
  const [carOrderInfo, setCarOrderInfo] = useState<Type.CarOrderInfo>({
    type: "",
    color: "",
    alarm: true,
    content: "",
    addressName: "",
    zoneNo: "",
  });

  const [openDaumPost, setOpenDaumPost] = useState<boolean>(false);

  const onChangeCarOrderInfo = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    if (name === "alarm") {
      setCarOrderInfo({
        ...carOrderInfo,
        [name]: value === "true" ? true : false,
      });
    } else {
      setCarOrderInfo({ ...carOrderInfo, [name]: value });
    }
  };

  const handleComplete = (data: any) => {
    console.log(data);

    setCarOrderInfo({
      ...carOrderInfo,
      addressName: data.address ? data.address : data.jibunAddress,
      zoneNo: data.zonecode,
    });
    //address //address /없으면/ jibunAddress  // zonecode
  };

  return {
    carOrderInfo,
    openDaumPost,
    onChangeCarOrderInfo,
    setOpenDaumPost,
    handleComplete,
  };
};
