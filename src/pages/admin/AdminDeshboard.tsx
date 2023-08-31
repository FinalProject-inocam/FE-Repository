import React from "react";
import { CustomH1, CustomH3, FlexBox, Grid, GridBox } from "../../components";
import { styled } from "styled-components";
import * as Type from "../../types";


export const AdminDeshboard: React.FC = () => {

  return (
    <DeshboardGrid $gtc="2fr 1fr" $gtr="1fr" $gap={20}>
      <GridBox $gtc="1fr" $gtr="1rem 1fr 2fr 1fr" $rgap={20} $jc="flex-start">
        <CustomH1 children="출고관리" />
        <GridBox $gtc="repeat(2, 1fr)" $cgap={20}>
          <FlexBox $fd="column" $ai="flex-start" $jc="flex-start" $gap={10} style={{ backgroundColor: "white", borderRadius: "10px" }}>
            <CustomH3 $size={1.5} children="요약" />
            <GridBox $cgap={4} $gtc="repeat(4, 1fr)">
              <div>출고신청</div>
              <div>출고승인</div>
              <div>출고취소</div>
              <div>하루정산</div>
            </GridBox>
          </FlexBox>

          <FlexBox $fd="column" $ai="flex-start" $jc="flex-start" $gap={10} style={{ backgroundColor: "white", borderRadius: "10px" }}>
            <CustomH3 $size={1.5} children="당일 출고관리" />
            <GridBox $cgap={4} $gtc="repeat(4, 1fr)">
              <div>출고신청</div>
              <div>출고승인</div>
              <div>출고취소</div>
              <div>하루정산</div>
            </GridBox>
          </FlexBox>

        </GridBox>
        <GridBox $cgap={20} style={{ backgroundColor: "white", borderRadius: "10px" }}>
          <div>두번째줄 왼쪽</div>
          <div>두번째줄 오른쪽</div>
        </GridBox>

        <GridBox $gtc="repeat(2, 1fr)" $cgap={20} >
          <div style={{ backgroundColor: "white" }} >세번째줄 왼쪽</div>
          <div style={{ backgroundColor: "white" }} >세번째줄 오른쪽</div>
        </GridBox>

      </GridBox>


      <GridBox $gtc="1fr" $gtr="1rem repeat(3, 1fr)" $rgap={20} >
        <CustomH1 children="회원관리" />
        <div style={{ backgroundColor: "white" }} >첫번째줄</div>
        <div style={{ backgroundColor: "white" }} >두번째줄</div>
        <div style={{ backgroundColor: "white" }} >세번째줄</div>
      </GridBox>

    </DeshboardGrid>
  );
};

const DeshboardGrid = styled.section<Partial<Type.Styled>>`
  ${Grid}
  padding: 30px 20px;
  background-color: ${({ theme }) => theme.color.lightgray1};
`


/*
 // { MouseEvent, useState } 
// import { useGetpurchasesChartYQuery } from "../../redux";
  // const [getType, setGetType] = useState("getYears");
  // console.log(getType);

  // const onGetData = (e: MouseEvent<HTMLButtonElement>) => {
  //   setGetType(e.currentTarget.innerText);
  // };

  // const query = useGetpurchasesChartYQuery("2023-08-19")
  // console.log(query)


*/ 