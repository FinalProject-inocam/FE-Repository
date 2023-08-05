import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import DaumPostcode from "react-daum-postcode";
import { usePostPurchasesMutation } from "../../redux";

interface CarOrderInfoType {
  type: string;
  color: string;
  alarm: boolean;
  content: string;
  addressName: string;
  zoneNo: string;
}

export const InoCarOrder: React.FC = () => {
  const [carOrderInfo, setCarOrderInfo] = useState<CarOrderInfoType>({
    type: "",
    color: "",
    alarm: true,
    content: "",
    addressName: "",
    zoneNo: "",
  });

  const [openDaumPost, setOpenDaumPost] = useState<boolean>(false);

  const [onPostPurchase, query] = usePostPurchasesMutation();

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

  const onSubmitCarOrder = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // console.log(carOrderInfo);
    // console.log(typeof carOrderInfo.alarm);
    onPostPurchase(carOrderInfo);
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

  useEffect(() => {
    query && console.log(query);
  }, [query]);

  return (
    <div>
      <form onSubmit={onSubmitCarOrder}>
        <input
          type="text"
          name="type"
          value={carOrderInfo.type}
          onChange={onChangeCarOrderInfo}
          placeholder="차량타입"
        />
        <input
          type="text"
          name="color"
          value={carOrderInfo.color}
          onChange={onChangeCarOrderInfo}
          placeholder="차량외관색상"
        />
        <input
          type="text"
          name="alarm"
          // value={carOrderInfo.alarm}
          onChange={onChangeCarOrderInfo}
          placeholder="메일링서비스 - true/ false 만 입력"
        />
        <input
          type="text"
          name="content"
          value={carOrderInfo.content}
          onChange={onChangeCarOrderInfo}
          placeholder="요청사항"
        />
        <input
          type="text"
          name="addressName"
          value={carOrderInfo.addressName}
          onChange={onChangeCarOrderInfo}
          placeholder="문의사항"
        />
        <input
          type="text"
          name="zoneNo"
          value={carOrderInfo.zoneNo}
          onChange={onChangeCarOrderInfo}
          placeholder="주소와 우편번호"
        />
        <button
          onClick={() => {
            setOpenDaumPost(true);
          }}
        >
          카카오주소검색
        </button>
        {openDaumPost && <DaumPostcode onComplete={handleComplete} />}

        <input type="submit" value="신청하기" />
      </form>
    </div>
  );
};

// yarn add react-daum-postcode
// import DaumPostcode from 'react-daum-postcode';

// <DaumPostCode onComplete={handleComplete} />

//   type : string(차량타입), -> 스마트(1385만)/ 디 에센셜 라이트(1490만) / 디 에센셜(1690만) / 인스퍼레이션(1870만)
//   color : string -> 외장 아이보리 / 메탈릭 / 화이트 / 오렌지 펄 / 톰보이 카키 / 블루 펄 / 카키 매트
//   alarm : boolean, -> 메일링  서비스 유무
//   content : string -> 요청사항
//   카카오 맵 //
//   addressName : string, -> 주소
//   zoneNo : string -> 우편주소
// }

// - 기아자동자, JEEP
// 타입(차량의큰 옵션)
// 색상(외부색상)
// 알람(관리자 승인에 대한 메일서비스)
// 컨텐드(문의사항)
// 주소와 우편주소
