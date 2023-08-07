import React, { ChangeEvent, useState } from "react";
import * as Type from "../../types";
import DaumPostcode from "react-daum-postcode";
import { usePatchPurchasesMutation } from "../../redux";

export const EditPurchase: React.FC<Type.CarOrderRes> = ({
  purchaseId,
  type,
  color,
  alarm,
  content,
  addressName,
  zoneNo,
}) => {
  const [carOrderInfo, setCarOrderInfo] = useState<Type.CarOrderInfo>({
    type: type,
    color: color,
    alarm: alarm,
    content: content,
    addressName: addressName,
    zoneNo: zoneNo,
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

  //여기 아래는 새로운 부분

  const [edit, setEdit] = useState<Boolean>(false);

  const onToogleEdit = () => {
    setEdit(!edit);
  };

  const [onPatchPurchasesRTK] = usePatchPurchasesMutation();

  const onPatchPurchases = (purchaseId: number) => () => {
    onPatchPurchasesRTK({ purchaseId, data: carOrderInfo });
  };

  return (
    <div>
      {!edit ? (
        <>
          <div>
            {purchaseId}
            {type}
            {color}
            {alarm}
            {content}
            {addressName}
            {zoneNo}
          </div>
          <button onClick={onToogleEdit}> 수정하기 </button>
        </>
      ) : (
        <>
          <input
            value={carOrderInfo.type}
            name="type"
            onChange={onChangeCarOrderInfo}
            placeholder="type"
          />
          <input
            value={carOrderInfo.color}
            name="color"
            onChange={onChangeCarOrderInfo}
            placeholder="color"
          />
          <input
            // value={carOrderInfo.alarm}
            name="alarm"
            onChange={onChangeCarOrderInfo}
            placeholder="alarm"
          />
          <input
            value={carOrderInfo.content}
            name="content"
            onChange={onChangeCarOrderInfo}
            placeholder="content"
          />
          <input
            value={carOrderInfo.addressName}
            name="type"
            onChange={onChangeCarOrderInfo}
            placeholder="addressName"
          />
          <input
            value={carOrderInfo.zoneNo}
            name="type"
            onChange={onChangeCarOrderInfo}
            placeholder="zoneNo"
          />
          <button
            onClick={() => {
              setOpenDaumPost(true);
            }}
          >
            카카오주소검색
          </button>
          {openDaumPost && <DaumPostcode onComplete={handleComplete} />}
          <button onClick={onPatchPurchases(purchaseId)}>수정제출</button>
          <button onClick={onToogleEdit}>수정취소</button>
        </>
      )}
    </div>
  );
};

// delete 수정해야함 현재 pop이라서 뒤에것만 지워짐
