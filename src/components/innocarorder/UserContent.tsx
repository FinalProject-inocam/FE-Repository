import { FC, useState, ChangeEvent } from "react";
import { styled } from "styled-components";
import * as RTK from "../../redux";

export const UserContent: FC = () => {
  const [input, setInput] = useState<string>("");
  const dispatch = RTK.useAppDispatch();

  const onChangeInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const onBlurOrderUserDispatch = () => {
    dispatch(RTK.setInnocarOrderData({ [`content`]: input }));
  };

  return (
    <>
      <ContentLayout
        value={input}
        onChange={onChangeInput}
        onBlur={onBlurOrderUserDispatch}
        placeholder="* 마이페이지를 통해 차량 수정 / 취소가 가능합니다. &#13;&#10;* 관리자 승인 후에는 수정 / 취소가 불가능한 점&#13;&#10;유의 바랍니다."
        maxLength={500}
      />
    </>
  );
};

const ContentLayout = styled.textarea`
  width: 100%;
  height: 330px;
  border: 1px solid ${({ theme }) => theme.color.lightgray4};
  border-radius: 4px;
  padding: 20px;
  resize: none;

  &::placeholder {
    font-size: 14px;
  }
`;
