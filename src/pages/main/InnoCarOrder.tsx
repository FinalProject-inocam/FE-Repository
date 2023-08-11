import React from "react";
import DaumPostcode from "react-daum-postcode";
import { useInnoCarOrder } from "../../hooks";

export const InnoCarOrder: React.FC = () => {
  const {
    carOrderInfo, 
    openDaumPost, 
    onSubmitCarOrder, 
    onChangeCarOrderInfo, 
    setOpenDaumPost, 
    handleComplete } = useInnoCarOrder()

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
