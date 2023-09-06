import { FC, useState, useEffect } from "react";
import * as RTK from "../../redux";
import { styled } from "styled-components";
import * as SC from "../css";

export const UserCheckInput: FC = () => {
  const [input, setInput] = useState<boolean>(true);
  const dispatch = RTK.useAppDispatch();

  //   useEffect(() => {
  //     input === true && dispatch(RTK.setInnocarOrderData({ [`alarm`]: input }));
  //     // eslint-disable-next-line
  //   }, []);

  useEffect(() => {
    dispatch(RTK.setInnocarOrderData({ [`alarm`]: input }));
  }, [input, dispatch]);

  return (
    <SC.FlexBox $jc={"none"}>
      <input
        type="checkbox"
        id="check_btn"
        checked={input}
        onChange={({ target: { checked } }) => setInput(checked)}
        style={{ display: "none" }}
      />
      <CheckLabel htmlFor="check_btn">✔</CheckLabel>
      <CheckText>
        차량 신청 승인 완료에 대한 메일링 서비스를 받겠습니다.
      </CheckText>
    </SC.FlexBox>
  );
};

const CheckLabel = styled.label`
  ${SC.Flex}
  width: 18px;
  height: 18px;
  border: 1px solid ${({ theme }) => theme.color.lightgray4};
  border-radius: 4px;
  margin-right: 4px;
  color: transparent;
  font-size: 12px;

  input[type="checkbox"]:checked + & {
    color: white;
    background-color: ${({ theme }) =>
      theme.color.blue}; /* 선택되었을 때의 배경색 */
    border: 1px solid ${({ theme }) => theme.color.blue}; /* 선택되었을 때의 테두리색 */
  }
`;

const CheckText = styled.div`
  ${({ theme }) => theme.font.PretendardM}
  font-size: 15px;
`;
