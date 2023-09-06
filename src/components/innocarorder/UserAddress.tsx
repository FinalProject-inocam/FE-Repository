import { FC, useState, ChangeEvent } from "react";
import * as SC from "../css";
import styled from "styled-components";
import DaumPostcode from "react-daum-postcode";
import * as RTK from "../../redux";
import { Modal } from "../commen";

export const UserAddress: FC<any> = ({ inputRef1, inputRef2 }) => {
  const dispatch = RTK.useAppDispatch();
  const [openDaumPost, setOpenDaumPost] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [input2, setInput2] = useState<string>("");

  const handleComplete = (data: any) => {
    console.log(data);
    //address //address /없으면/ jibunAddress  // zonecode
    setInput(data.address ? data.address : data.jibunAddress);
    dispatch(RTK.setInnocarOrderData({ [`zoneNo`]: data.zonecode }));
    setOpenDaumPost(false);
  };

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput2(e.target.value);
  };

  const onBlurOrderUserDispatch = () => {
    dispatch(
      RTK.setInnocarOrderData({ [`addressName`]: input + " " + input2 })
    );
  };

  return (
    <>
      <UserAddressLayout>
        <SC.FlexBox $gap={10} $jc={"none"} $ai={"none"}>
          <SC.AuthInput
            type="text"
            value={input}
            $width={"100%"}
            $state={true}
            ref={inputRef1}
            readOnly
          />
          <OpenKaKaoMapBtn
            onClick={() => {
              setOpenDaumPost(true);
            }}
          >
            주소 찾기
          </OpenKaKaoMapBtn>
        </SC.FlexBox>
        <SC.AuthInput
          type="text"
          value={input2}
          onBlur={onBlurOrderUserDispatch}
          onChange={onChangeInput}
          placeholder="상세주소 입력"
          ref={inputRef2}
          $width={"100%"}
          $state={true}
        />
      </UserAddressLayout>
      {openDaumPost && (
        <Modal state={true} setState={setOpenDaumPost}>
          <DaumPostcode onComplete={handleComplete} />
        </Modal>
      )}
    </>
  );
};

const UserAddressLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const OpenKaKaoMapBtn = styled.div`
  ${SC.Flex}
  ${SC.cursor}
  width: 140px;
  border: 1px solid ${({ theme }) => theme.color.textColorSub};
  border-radius: 4px;

  &:hover {
    border: 1px solid ${({ theme }) => theme.color.blue};
    color: ${({ theme }) => theme.color.blue};
  }
`;

// dispatch(
//     RTK.setInnocarOrderData({
//       [`addressName`]: data.address ? data.address : data.jibunAddress,
//     })
//   );
