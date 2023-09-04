import { FC, ChangeEvent, useEffect, useState } from "react";
import * as RTK from "../../redux";
import * as SC from "../css/GlobalStyled";
import { styled } from "styled-components";
import { Styled } from "../../types";

export const InnoCarOrderTrim: FC<any> = ({ setTrimPrice }) => {
  const [input, setInput] = useState<string>("INNO I Air");
  const dispatch = RTK.useAppDispatch();
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    dispatch(RTK.setInnocarOrderData({ trim: input }));
    setTrimPrice(parseInt(input === "INNO I Air" ? "500800000" : "510800000"));
  }, [dispatch, input, setTrimPrice]);

  return (
    <SC.FlexBox
      $fd={"column"}
      $jc={"space-between"}
      style={{ height: "200px" }}
    >
      <input
        type="radio"
        id="air"
        name="trim"
        value="INNO I Air"
        onChange={onChangeInput}
        style={{ display: "none" }}
      />
      <CarTrimLabel htmlFor="air" $state={input === "INNO I Air"}>
        <CarTrimText>INNO I 에어</CarTrimText>
        <CarTrimText $types="price">50,080,0000 원</CarTrimText>
      </CarTrimLabel>
      <input
        type="radio"
        id="light"
        name="trim"
        value="INNO I Light"
        onChange={onChangeInput}
        style={{ display: "none" }}
      />
      <CarTrimLabel htmlFor="light" $state={input === "INNO I Light"}>
        <CarTrimText>INNO I 라이트</CarTrimText>
        <CarTrimText $types="price">51,080,0000 원</CarTrimText>
      </CarTrimLabel>
    </SC.FlexBox>
  );
};

const CarTrimLabel = styled.label<Partial<Styled>>`
  ${SC.cursor}
  height: 90px;
  width: 100%;
  font-size: 20px;
  font-weight: 600;
  font-display: center;
  border-radius: 6px;
  padding: 15px 24px;

  border: 1px solid
    ${({ theme, $state }) => ($state ? "#05141f" : theme.color.lightgray4)};

  box-shadow: ${({ $state }) =>
    $state ? "0 3px 6px 0 rgba(0,0,0,.16)" : "none"};
`;

const CarTrimText = styled.div<Partial<Styled>>`
  font-size: 18px;
  font-weight: 600;
  color: ${({ $types, theme }) =>
    $types === "price" ? theme.color.lightgray2 : "inherit"};
`;
