import React, { MouseEvent, useState } from "react";
import { CustomH1, CustomH3, FigureObjectFitImg, Flex, FlexBox, Grid, GridBox, cursor } from "../../components";
import { css, styled } from "styled-components";
import * as Type from "../../types";
import { useGetPurchaseChartQuery, useGetUserChartQuery } from "../../redux";
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, PolarArea } from "react-chartjs-2";
import * as ASS from "../../assets"; // calendar, underArrow, leftArrowB, leftArrowG, rigthArrowB, rigthArrowG
import dayjs from 'dayjs'
import "dayjs/locale/ko";
dayjs.locale('ko')
ChartJS.register(ArcElement, Tooltip, RadialLinearScale, Legend);

export const AdminDeshboard: React.FC = () => {

  const year = new Date().getFullYear()
  const { isLoading: userLoading, data: useData, isError: userIsError, error: userError } = useGetUserChartQuery(year)

  const userGenderRatio = {
    labels: ["남성", "여성", "알수없음"],
    datasets: [
      {
        label: "회원 성별통계",
        data: useData && [useData.gender.ratio.MALE, useData.gender.ratio.FEMALE, useData.gender.ratio.UNKNOWN],
        borderColor: [
          "rgba(76,76,255,0.3)",
          "rgba(252,85,85,0.3)",
          "rgba(130,130,149,0.3)",
        ],
        backgroundColor: [
          "rgba(76,76,255,0.3)",
          "rgba(252,85,85,0.3)",
          "rgba(130,130,149,0.3)",
        ]
      }
    ]
  }

  const userAgeRatio = {
    labels: ["10~20대", "30대", "40대", "50대", "60대", "70대 이상"],
    datasets: [
      {
        label: "회원 성별통계",
        data: useData && [
          useData.age.ratio['20'],
          useData.age.ratio['30'],
          useData.age.ratio['40'],
          useData.age.ratio['50'],
          useData.age.ratio['60'],
          useData.age.ratio['70+'],
        ],
        borderColor: [
          "rgba(55,55,194,0.3)",
          "rgba(97,97,245,0.3)",
          "rgba(41,204,106,0.3)",
          "rgba(242,209,36,0.3)",
          "rgba(252,85,85,0.3)",
          "rgba(255,161,31,0.3)",
          "rgba(252,85,85,0.3)",
        ],
        backgroundColor: [
          "rgba(55,55,194,0.3)",
          "rgba(97,97,245,0.3)",
          "rgba(41,204,106,0.3)",
          "rgba(242,209,36,0.3)",
          "rgba(252,85,85,0.3)",
          "rgba(255,161,31,0.3)",
          "rgba(252,85,85,0.3)",
        ]
      }
    ]
  }

  const useDataRatioOpts = {
    plugins: {
      legend: {
        display: false,
      }
    }
  }

  /* DataTypeSelect //------------------------------------------------- */
  const newDate = dayjs().format("YYYY-MM-DD")
  const [dataTypeSelect, setDataTypeSelect] = useState<boolean>(false)
  const [getType, setGetType] = useState<string[]>(["주간", "week"])
  const [showPeriod, setShowPeriod] = useState<string>(`${dayjs().startOf('week').format("MM/DD")} ~ ${dayjs().endOf('week').format("MM/DD")}`)
  const [period, setPeriod] = useState<string>(newDate)

  const query = useGetPurchaseChartQuery({ type: getType[1], period })
  const onChangeDataTypeSelect = () => {
    setDataTypeSelect(pre => !pre)
  }

  const onPeriodSelect = (e: MouseEvent<HTMLDivElement>) => {
    const { dataset: { value } } = e.target as HTMLDivElement
    const selectDate = dayjs()
    const valueArr = value?.split(".")
    setGetType(valueArr as string[])
    switch (valueArr && valueArr[1]) {
      case "week":
        setPeriod(selectDate.format("YYYY-MM-DD"))
        setShowPeriod(`${selectDate.startOf('week').format("MM/DD")} ~ ${selectDate.endOf('week').format("MM/DD")}`)
        return
      case "month":
        setPeriod(selectDate.format("YYYY-MM"))
        setShowPeriod(`${selectDate.startOf('month').format("MM/DD")} ~ ${selectDate.endOf('month').format("MM/DD")}`)
        return
      default:
        setPeriod(selectDate.format("YYYY"))
        setShowPeriod(`${selectDate.startOf('year').format("YY.MM")} ~ ${selectDate.endOf('year').format("YY.MM")}`)
        return
    }
  }
  console.log("useGetPurchaseChartQuery", query)

  return (
    <DeshboardGrid $gtc="1fr 380px" $gtr="1fr">
      {/* PurchaseChartLayout // header */}
      <ChartLayout $bColor="lightgray1" $padding="40px">
        <FlexBox $jc="space-between">
          <CustomH1 $size={1.5} $color="darkBlue3" children="출고관리" />
          <FlexBox $gap={10}>
            <DataTypeSelect $jc="space-around" onClick={onChangeDataTypeSelect}>
              <div>{getType[0]}</div>
              <FigureObjectFitImg width="14px" height="7px" src={ASS.underArrow} alt="underArrow"></FigureObjectFitImg>
              {dataTypeSelect && (
                <DataTypeOptions>
                  {[["주간", "week"], ["월간", "month"], ["연간", "year"]].map(list => <div onClick={onPeriodSelect} data-value={list.join(".")} key={list[1]}>{list[0]}</div>)}
                </DataTypeOptions>
              )}
            </DataTypeSelect>
            <DateShowPeriod $jc="space-between">
              <FigureObjectFitImg width="16px" height="16px" src={ASS.leftArrowB} alt="leftArrow" />
              <div>{showPeriod}</div>
              <FigureObjectFitImg width="16px" height="16px" src={ASS.rigthArrowG} alt="rigthArrow" />
            </DateShowPeriod>
            <FigureObjectFitImg width="40px" height="40px" src={ASS.calendar} alt="calendar" />
          </FlexBox>
        </FlexBox>

        {/* PurchaseChartLayout // body */}
        <GridBox $gtc="1fr" $gtr="180px repeat(2, 1fr)" $rgap={20} $jc="flex-start" style={{ height: "calc(100% - 40px)", marginTop: "10px" }}>
          <GridBox $gap={10}>
            <ChartInner $fd="column" $ai="flex-start" $gap={10} $types="left">
              <CustomH1 $size={1.125} children="주간요약" />
              <GridBox $gtc="repeat(3, 1fr)" style={{ height: "100%" }} $gap={4}>
                {userLoading
                  ? <div>로딩 중... </div>
                  : userIsError
                    ? <div>Error...{JSON.stringify(userError)}</div>
                    : (<>
                      <FlexBox $gap={3} $fd="column" $ai="flex-start" style={{ padding: "0 25px", border: "1px solid #DEDEE0", borderRadius: "10px" }}>
                        <CustomH3 $size={0.75} $color="textColorSub" children="출고현황" />
                        <CustomH3 $size={1.5} children={<>13<span children="건" /></>} />
                        <CustomH3 $size={0.75} $color="textColorSub" children={`전주, 7명`} />
                      </FlexBox>
                      <FlexBox $gap={3} $fd="column" $ai="flex-start" style={{ padding: "0 25px", border: "1px solid #DEDEE0", borderRadius: "10px" }}>
                        <CustomH3 $size={0.75} $color="textColorSub" children="출고승인" />
                        <CustomH3 $size={1.5} children={<>5<span children="건" /></>} />
                        <CustomH3 $size={0.75} style={{ visibility: "visible", height: "15px" }} />
                      </FlexBox>
                      <FlexBox $gap={3} $fd="column" $ai="flex-start" style={{ padding: "0 25px", border: "1px solid #DEDEE0", borderRadius: "10px" }}>
                        <CustomH3 $size={0.75} $color="textColorSub" children="츨고취소" />
                        <CustomH3 $size={1.5} children={<>5<span children="건" /></>} />
                        <CustomH3 $size={0.75} style={{ visibility: "visible", height: "15px" }} />
                      </FlexBox>
                    </>)
                }
              </GridBox>
            </ChartInner>
            <ChartInner $fd="column" $ai="flex-start" $gap={10} $types="left">
              <CustomH1 $size={1.125} children="금일 출고 현황" />
              <GridBox $gtc="repeat(3, 1fr)" style={{ height: "100%" }} $gap={4}>
                {userLoading
                  ? <div>로딩 중... </div>
                  : userIsError
                    ? <div>Error...{JSON.stringify(userError)}</div>
                    : (<>
                      <FlexBox $gap={3} $fd="column" $ai="flex-start" style={{ padding: "0 25px", border: "1px solid #DEDEE0", borderRadius: "10px" }}>
                        <CustomH3 $size={0.75} $color="textColorSub" children="출고현황" />
                        <CustomH3 $size={1.5} children={<>13<span children="건" /></>} />
                        <CustomH3 $size={0.75} $color="textColorSub" children={`전주, 7명`} />
                      </FlexBox>
                      <FlexBox $gap={3} $fd="column" $ai="flex-start" style={{ padding: "0 25px", border: "1px solid #DEDEE0", borderRadius: "10px" }}>
                        <CustomH3 $size={0.75} $color="textColorSub" children="출고승인" />
                        <CustomH3 $size={1.5} children={<>5<span children="건" /></>} />
                        <CustomH3 $size={0.75} style={{ visibility: "visible", height: "15px" }} />
                      </FlexBox>
                      <FlexBox $gap={3} $fd="column" $ai="flex-start" style={{ padding: "0 25px", border: "1px solid #DEDEE0", borderRadius: "10px" }}>
                        <CustomH3 $size={0.75} $color="textColorSub" children="츨고취소" />
                        <CustomH3 $size={1.5} children={<>5<span children="건" /></>} />
                        <CustomH3 $size={0.75} style={{ visibility: "visible", height: "15px" }} />
                      </FlexBox>
                    </>)
                }
              </GridBox>
            </ChartInner>
          </GridBox>
          <ChartInner $types="left" />
          <ChartInner $types="left" />
        </GridBox>
      </ChartLayout>


      {/* UserChartLayout //------------------------------------------------- */}
      <ChartLayout $bColor="blue" $padding="40px 10px">
        <FlexBox $jc="space-between" style={{ height: "42px" }}>
          <CustomH1 $size={1.5} $color="white" children="회원관리" />
        </FlexBox>
        <GridBox $gtc="1fr" $gtr="180px repeat(2, 1fr)" style={{ height: "calc(100% - 40px)", marginTop: "10px" }} $rgap={10}>
          <ChartInner $fd="column" $ai="flex-start" $gap={10}>
            <CustomH1 $size={1.125} children="회원정도 연간통계" />
            <GridBox style={{ height: "100%" }} $gap={4}>
              {userLoading
                ? <div>로딩 중... </div>
                : userIsError
                  ? <div>Error...{JSON.stringify(userError)}</div>
                  : (<>
                    <FlexBox $gap={3} $fd="column" $ai="flex-start" style={{ padding: "0 25px", border: "1px solid #DEDEE0", borderRadius: "10px" }}>
                      <CustomH3 $size={0.75} $color="textColorSub" children="가입 회원 수" />
                      <CustomH3 $size={1.5} children={<>13<span children="건" /><span style={{ color: 13 - useData.preUser >= 0 ? "red" : "blue", marginLeft: "5px", fontSize: "12px" }} children={`${13 - useData.preUser >= 0 ? "↑" + (13 - useData.preUser) : "↓" + (13 - useData.preUser)}명`} /></>} />
                      <CustomH3 $size={0.75} $color="textColorSub" children={`작년, ${useData.preUser}명`} />
                    </FlexBox>
                    <FlexBox $gap={3} $fd="column" $ai="flex-start" style={{ padding: "0 25px", border: "1px solid #DEDEE0", borderRadius: "10px" }}>
                      <CustomH3 $size={0.75} $color="textColorSub" children="이번달 가입 회원 수" />
                      <CustomH3 $size={1.5} children={<>5<span children="건" /></>} />
                      <CustomH3 $size={0.75} style={{ visibility: "visible", height: "15px" }} />
                    </FlexBox>
                  </>)
              }
            </GridBox>
          </ChartInner>
          <ChartInner>
            <FlexBox $fd="column" $jc="flex-start" $ai="flex-start" $gap={10} style={{ width: "100%", height: "100%" }}>
              <CustomH1 $size={1.125} children="회원 성별통계" />
              <FlexBox style={{ height: "90%", margin: "0 auto" }} $gap={10}>
                <div style={{ width: "150px", height: "150px" }}><Doughnut options={useDataRatioOpts} data={userGenderRatio} /></div>
                <FlexBox $fd="column" $gap={17} $ai="flex-start">
                  {userLoading
                    ? <div>로딩 중... </div>
                    : userIsError
                      ? <div>Error...{JSON.stringify(userError)}</div>
                      : (<>
                        <FlexBox $gap={5}>
                          <RatioBox $size={14} $bColor="blue" />
                          <CustomH3 $size={0.875} $color="blue" children="남성" />
                          <CustomH3 $size={0.875} children={`${useData.gender.byGender.MALE}명`} />
                          <CustomH3 $size={0.875} children={`${useData.gender.ratio.MALE}%`} />
                        </FlexBox>
                        <FlexBox $gap={5}>
                          <RatioBox $size={14} $bColor="red3" />
                          <CustomH3 $size={0.875} $color="red3" children="여성" />
                          <CustomH3 $size={0.875} children={`${useData.gender.byGender.FEMALE}명`} />
                          <CustomH3 $size={0.875} children={`${useData.gender.ratio.FEMALE}%`} />
                        </FlexBox>
                        <FlexBox $gap={5}>
                          <RatioBox $size={14} $bColor="textColorSub" />
                          <CustomH3 $size={0.875} $color="textColorSub" children="알수없음" />
                          <CustomH3 $size={0.875} children={`${useData.gender.byGender.UNKNOWN}명`} />
                          <CustomH3 $size={0.875} children={`${useData.gender.ratio.UNKNOWN}%`} />
                        </FlexBox>

                      </>)}
                </FlexBox>
              </FlexBox>
            </FlexBox>
          </ChartInner>
          <ChartInner>
            <FlexBox $fd="column" $jc="flex-start" $ai="flex-start" $gap={10} style={{ width: "100%", height: "100%" }}>
              <CustomH1 $size={1.125} children="회원 연령통계" />
              <FlexBox style={{ height: "90%", margin: "0 auto" }} $gap={10}>
                <div style={{ width: "150px", height: "150px" }}><PolarArea options={useDataRatioOpts} data={userAgeRatio} /></div>
                <FlexBox $fd="column" $gap={10} $ai="flex-start">
                  {userLoading
                    ? <div>로딩 중... </div>
                    : userIsError
                      ? <div>Error...{JSON.stringify(userError)}</div>
                      : (<>
                        <FlexBox $gap={5}>
                          <RatioBox $size={14} $bColor="chartBlue" />
                          <CustomH3 $size={0.875} $color="chartBlue" children="10~20대" />
                          <CustomH3 $size={0.875} children={`${useData.age.byAge['20']}명`} />
                          <CustomH3 $size={0.875} children={`${useData.age.ratio['20']}%`} />
                        </FlexBox>
                        <FlexBox $gap={5}>
                          <RatioBox $size={14} $bColor="chartSkyblue" />
                          <CustomH3 $size={0.875} $color="chartSkyblue" children="30대" />
                          <CustomH3 $size={0.875} children={`${useData.age.byAge['30']}명`} />
                          <CustomH3 $size={0.875} children={`${useData.age.ratio['30']}%`} />
                        </FlexBox>
                        <FlexBox $gap={5}>
                          <RatioBox $size={14} $bColor="chartGreen" />
                          <CustomH3 $size={0.875} $color="chartGreen" children="40대" />
                          <CustomH3 $size={0.875} children={`${useData.age.byAge['40']}명`} />
                          <CustomH3 $size={0.875} children={`${useData.age.ratio['40']}%`} />
                        </FlexBox>
                        <FlexBox $gap={5}>
                          <RatioBox $size={14} $bColor="chartYellow" />
                          <CustomH3 $size={0.875} $color="chartYellow" children="50대" />
                          <CustomH3 $size={0.875} children={`${useData.age.byAge['50']}명`} />
                          <CustomH3 $size={0.875} children={`${useData.age.ratio['50']}%`} />
                        </FlexBox>
                        <FlexBox $gap={5}>
                          <RatioBox $size={14} $bColor="chartOrange" />
                          <CustomH3 $size={0.875} $color="chartOrange" children="60대" />
                          <CustomH3 $size={0.875} children={`${useData.age.byAge['60']}명`} />
                          <CustomH3 $size={0.875} children={`${useData.age.ratio['60']}%`} />
                        </FlexBox>
                        <FlexBox $gap={5}>
                          <RatioBox $size={14} $bColor="chartRed" />
                          <CustomH3 $size={0.875} $color="chartRed" children="70대 이상" />
                          <CustomH3 $size={0.875} children={`${useData.age.byAge['70+']}명`} />
                          <CustomH3 $size={0.875} children={`${useData.age.ratio['70+']}%`} />
                        </FlexBox>
                      </>)}
                </FlexBox>
              </FlexBox>

            </FlexBox>
          </ChartInner>

        </GridBox>
      </ChartLayout>

    </DeshboardGrid>
  );
};


const DeshboardGrid = styled.section<Partial<Type.Styled>>`
  ${Grid}
  background-color: ${({ theme }) => theme.color.lightgray1};
`

const ChartLayout = styled.div<Partial<Type.Styled>>`
  height: 100%;
  padding: ${({ $padding }) => $padding};
  background-color: ${({ $bColor, theme }) => theme.color[`${$bColor}`]};
`


const ChartInner = styled.div<Partial<Type.Styled>>`
  ${Flex}
  padding: 15px;
  background-color: white;
  border-radius: 10px;

  ${({ $types }) => $types === "left" && css`
    box-shadow: rgba(0, 0, 0, 0.35) 0px 3px 10px;  
  `}
`

const RatioBox = styled.div<Partial<Type.Styled>>`
  width: ${({ $size }) => `${$size}px`};
  height: 14px;
  background-color: ${({ $bColor, theme }) => theme.color[`${$bColor}`]};
`
const DataTypeSelect = styled.div<Partial<Type.Styled>>`
  ${Flex}
  ${cursor}
  width: 100px;
  height: 42px;
  position: relative;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.lightgray5};
`

const DataTypeOptions = styled.div`
  position: absolute;
  bottom: ${-42 * 3 - 10}px;
  width: 100px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.lightgray5};

  div {
    ${Flex}
    height: 42px;
  }
`

const DateShowPeriod = styled.div<Partial<Type.Styled>>`
  ${Flex}
  width: 270px;
  border-radius: 5px;
  height: 42px;
  padding: 0 20px;
  background-color: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.lightgray5};
  
`


/*
  회원통계 : 유저 성별 useData.gender.ratio.FEMALE / MALE / UNKNOWN
  회원통계 : 유저 연령 useData.age.ratio. 10- / 20 / 30 / 40 / 50 / 60 / 70+
  회원통계 : 유저 비교, 작년 useData.preUser
  회원통계 : 유저 비교, 작년 useData.users. 1 /2 /3 /4 /5 /6 /7 /8 /9 /10 /11 /12
*/