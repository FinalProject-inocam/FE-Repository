// import { FC, ChangeEvent, useEffect, useState } from "react";
import { FC, ChangeEvent, useEffect } from "react";
import { styled } from "styled-components";
import { Flex, FlexBox, cursor } from "../css/GlobalStyled";
import * as RTK from "../../redux";
import { Styled } from "../../types";
import { check, whiteCheck } from "../../assets";

export const InnoCarOrderColor: FC<any> = ({
  colorPrice,
  setColorPrice,
  carColor,
  setCarColor,
  carColors,
}) => {
  const dispatch = RTK.useAppDispatch();
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setCarColor(e.target.value);
  };

  useEffect(() => {
    dispatch(RTK.setInnocarOrderData({ color: carColor }));
    setColorPrice(carColor === "옐로우" && 80000);
  }, [dispatch, carColor, setColorPrice]);

  return (
    <>
      <CarColorOption>외장</CarColorOption>
      <CarCPName>
        <div>{carColor}</div>
        {!!colorPrice && <div> {colorPrice} 원</div>}
      </CarCPName>
      <CarColorLayout>
        <FlexBox>
          {carColors.map((item: any, idx: any) => (
            <div key={idx}>
              <input
                type="radio"
                id={item[0]}
                name="carColor"
                value={item[1]}
                onChange={onChangeInput}
                style={{ display: "none" }}
              />
              <CarColorBox>
                <CarColorLabel htmlFor={item[0]} $color={item[0]}>
                  {carColor === item[1] && (
                    <CarColorCheck
                      src={item[1] === "블랙" ? whiteCheck : check}
                      alt="check"
                    />
                  )}
                </CarColorLabel>
              </CarColorBox>
            </div>
          ))}
        </FlexBox>
      </CarColorLayout>
    </>
  );
};

const CarColorOption = styled.div`
  height: 40px;
  font-weight: 600;
`;

const CarColorLayout = styled.div`
  ${Flex}
  height: 100px;
  width: 100%;
`;

//420px

const CarColorBox = styled.div`
  height: 100%;
  width: 70px;
`;

const CarCPName = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 20px;
`;

const CarColorLabel = styled.label<Partial<Styled>>`
  ${cursor}
  position: relative;
  width: 48px;
  height: 48px;
  background-color: ${({ $color }) =>
    $color === "gray"
      ? "#6F7686"
      : $color === "red"
      ? "red"
      : $color === "black"
      ? "black"
      : $color === "wine"
      ? "#A11A55"
      : $color === "yellow"
      ? "yellow"
      : "white"};
  border-radius: 50%; /* 원모양으로 만들기 위한 속성 */
  display: inline-block; /* 레이블을 인라인 블록 요소로 변경 */
  border: 1px solid
    ${({ $color, theme }) =>
      $color === "white" ? theme.color.lightgray4 : "none"};
`;

const CarColorCheck = styled.img<Partial<Styled>>`
  position: absolute;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
