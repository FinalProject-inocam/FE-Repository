import { FC } from "react";
import * as SC from "../css";
import { useAdminDeshboard } from "../../hooks/admin";
import { BiSolidUpArrow, BiSolidDownArrow } from 'react-icons/bi' 
import {
  Chart as ChartJS,
  PointElement,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut, PolarArea } from "react-chartjs-2";
import dayjs from "dayjs";
ChartJS.register(
  ArcElement,
  Tooltip,
  PointElement,
  RadialLinearScale,
  Legend
);

export const DeshboardUser: FC = () => {
  const {
    // RTKQ
    userLoading,
    userIsError,
    userError,
    userData,

    // Chart
    onReduce,
    dataRatioOpts,
    userGenderRatio,
    userAgeRatio,
  } = useAdminDeshboard();
  console.log("userData", userData)

  return (
    <SC.ChartLayout $bColor='blue' $padding='40px 10px'>
      <SC.FlexBox $jc='space-between' style={{ height: "42px" }}>
        <SC.CustomH1 $size={1.5} $color='white' children='회원관리' />
      </SC.FlexBox>
      <SC.GridBox
        $gtc='1fr'
        $gtr='180px repeat(2, 1fr)'
        style={{ height: "calc(100% - 40px)", marginTop: "10px" }}
        $rgap={10}>
        <SC.ChartInner $fd='column' $ai='flex-start' $gap={10}>
          <SC.CustomH1 $size={1.125} children='회원정도 연간통계' />
          <SC.GridBox style={{ height: "100%" }} $gap={4}>
            {userLoading ? (
              <div>로딩 중... </div>
            ) : userIsError ? (
              <div>서버... 꺼짐...</div>
            ) : (
              <>
                <SC.FlexBox
                  $gap={3}
                  $fd='column'
                  $ai='flex-start'
                  style={{
                    padding: "0 25px",
                    border: "1px solid #DEDEE0",
                    borderRadius: "10px",
                  }}>
                  <SC.CustomH3 $size={0.75} $color='textColorSub' children='가입 회원 수' />
                  <SC.CustomH3
                    $size={1}
                    children={
                      <>
                        {onReduce(userData.users)}
                        <span children='건' />
                        {!!userData && onReduce(userData.users) - userData.preUser < 0
															? <span style={{ fontSize: "10px", marginLeft: "5px", color:"red" }} 
																	children={<><BiSolidDownArrow /> {!!userData && onReduce(userData.users) - userData.preUser}건</>} />
															: !!userData && onReduce(userData.users) - userData.preUser > 0
															&& <span style={{ fontSize: "10px", marginLeft: "5px", color:"blue"  }} 
																	children={<><BiSolidUpArrow/> {!!userData && onReduce(userData.users) - userData.preUser}건</>} />
														}
                      </>
                    }
                  />
                  <SC.CustomH3
                    $size={0.75}
                    $color='textColorSub'
                    children={`작년, ${userData.preUser}명`}
                  />
                </SC.FlexBox>
                <SC.FlexBox
                  $gap={3}
                  $fd='column'
                  $ai='flex-start'
                  style={{
                    padding: "0 25px",
                    border: "1px solid #DEDEE0",
                    borderRadius: "10px",
                  }}>
                  <SC.CustomH3
                    $size={0.75}
                    $color='textColorSub'
                    children='이번달 가입 회원 수'
                  />
                  <SC.CustomH3
                    $size={1}
                    children={
                      <>
                      {!!userData && userData.users[dayjs().format("M")]}
                        <span children='건' />
                        {!!userData && userData.users[dayjs().format("M")] - userData.users[+dayjs().format("M")-1] < 0
															? <span style={{ fontSize: "10px", marginLeft: "5px", color:"red" }} 
																	children={<><BiSolidDownArrow /> {!!userData &&  userData.users[dayjs().format("M")] - userData.users[+dayjs().format("M")-1]}건</>} />
															: !!userData &&  userData.users[dayjs().format("M")] - userData.users[+dayjs().format("M")-1] > 0
															&& <span style={{ fontSize: "10px", marginLeft: "5px", color:"blue"  }} 
																	children={<><BiSolidUpArrow/> {!!userData &&  userData.users[dayjs().format("M")] - userData.users[+dayjs().format("M")-1]}건</>} />
														}
                      </>
                    }
                  />
                  <SC.CustomH3
                    $size={0.75}
                    $color='textColorSub'
                    children={`지난달, ${!!userData && userData.users[+dayjs().format("M")-1]}명`}
                  />
                </SC.FlexBox>
              </>
            )}
          </SC.GridBox>
        </SC.ChartInner>
        <SC.ChartInner>
          <SC.FlexBox
            $fd='column'
            $jc='flex-start'
            $ai='flex-start'
            $gap={10}
            style={{ width: "100%", height: "100%" }}>
            <SC.CustomH1 $size={1.125} children='회원 성별통계' />
            <SC.FlexBox style={{ height: "90%", margin: "0 auto" }} $gap={10}>
              <div style={{ width: "150px", height: "150px" }}>
                <Doughnut options={dataRatioOpts} data={userGenderRatio} />
              </div>
              <SC.FlexBox $fd='column' $gap={17} $ai='flex-start'>
                {userLoading ? (
                  <div>로딩 중... </div>
                ) : userIsError ? (
                  <div>Error...{JSON.stringify(userError)}</div>
                ) : (
                  <>
                    <SC.FlexBox $gap={5}>
                      <SC.RatioBox $size={14} $bColor='blue' />
                      <SC.CustomH3 $size={0.875} $color='blue' children='남성' />
                      <SC.CustomH3
                        $size={0.875}
                        children={`${userData.gender.byGender.MALE}명`}
                      />
                      <SC.CustomH3
                        $size={0.875}
                        children={`${userData.gender.ratio.MALE}%`}
                      />
                    </SC.FlexBox>
                    <SC.FlexBox $gap={5}>
                      <SC.RatioBox $size={14} $bColor='red3' />
                      <SC.CustomH3 $size={0.875} $color='red3' children='여성' />
                      <SC.CustomH3
                        $size={0.875}
                        children={`${userData.gender.byGender.FEMALE}명`}
                      />
                      <SC.CustomH3
                        $size={0.875}
                        children={`${userData.gender.ratio.FEMALE}%`}
                      />
                    </SC.FlexBox>
                    <SC.FlexBox $gap={5}>
                      <SC.RatioBox $size={14} $bColor='textColorSub' />
                      <SC.CustomH3 $size={0.875} $color='textColorSub' children='알수없음' />
                      <SC.CustomH3
                        $size={0.875}
                        children={`${userData.gender.byGender.UNKNOWN}명`}
                      />
                      <SC.CustomH3
                        $size={0.875}
                        children={`${userData.gender.ratio.UNKNOWN}%`}
                      />
                    </SC.FlexBox>
                  </>
                )}
              </SC.FlexBox>
            </SC.FlexBox>
          </SC.FlexBox>
        </SC.ChartInner>
        <SC.ChartInner>
          <SC.FlexBox
            $fd='column'
            $jc='flex-start'
            $ai='flex-start'
            $gap={10}
            style={{ width: "100%", height: "100%" }}>
            <SC.CustomH1 $size={1.125} children='회원 연령통계' />
            <SC.FlexBox style={{ height: "90%", margin: "0 auto" }} $gap={10}>
              <div style={{ width: "150px", height: "150px" }}>
                <PolarArea options={dataRatioOpts} data={userAgeRatio} />
              </div>
              <SC.FlexBox $fd='column' $gap={10} $ai='flex-start'>
                {userLoading ? (
                  <div>로딩 중... </div>
                ) : userIsError ? (
                  <div>Error...{JSON.stringify(userError)}</div>
                ) : (
                  <>
                    <SC.FlexBox $gap={5}>
                      <SC.RatioBox $size={14} $bColor='chartBlue' />
                      <SC.CustomH3 $size={0.875} $color='chartBlue' children='10~20대' />
                      <SC.CustomH3 $size={0.875} children={`${userData.age.byAge["20"]}명`} />
                      <SC.CustomH3 $size={0.875} children={`${userData.age.ratio["20"]}%`} />
                    </SC.FlexBox>
                    <SC.FlexBox $gap={5}>
                      <SC.RatioBox $size={14} $bColor='chartSkyblue' />
                      <SC.CustomH3 $size={0.875} $color='chartSkyblue' children='30대' />
                      <SC.CustomH3 $size={0.875} children={`${userData.age.byAge["30"]}명`} />
                      <SC.CustomH3 $size={0.875} children={`${userData.age.ratio["30"]}%`} />
                    </SC.FlexBox>
                    <SC.FlexBox $gap={5}>
                      <SC.RatioBox $size={14} $bColor='chartGreen' />
                      <SC.CustomH3 $size={0.875} $color='chartGreen' children='40대' />
                      <SC.CustomH3 $size={0.875} children={`${userData.age.byAge["40"]}명`} />
                      <SC.CustomH3 $size={0.875} children={`${userData.age.ratio["40"]}%`} />
                    </SC.FlexBox>
                    <SC.FlexBox $gap={5}>
                      <SC.RatioBox $size={14} $bColor='chartYellow' />
                      <SC.CustomH3 $size={0.875} $color='chartYellow' children='50대' />
                      <SC.CustomH3 $size={0.875} children={`${userData.age.byAge["50"]}명`} />
                      <SC.CustomH3 $size={0.875} children={`${userData.age.ratio["50"]}%`} />
                    </SC.FlexBox>
                    <SC.FlexBox $gap={5}>
                      <SC.RatioBox $size={14} $bColor='chartOrange' />
                      <SC.CustomH3 $size={0.875} $color='chartOrange' children='60대' />
                      <SC.CustomH3 $size={0.875} children={`${userData.age.byAge["60"]}명`} />
                      <SC.CustomH3 $size={0.875} children={`${userData.age.ratio["60"]}%`} />
                    </SC.FlexBox>
                    <SC.FlexBox $gap={5}>
                      <SC.RatioBox $size={14} $bColor='chartRed' />
                      <SC.CustomH3 $size={0.875} $color='chartRed' children='70대 이상' />
                      <SC.CustomH3
                        $size={0.875}
                        children={`${userData.age.byAge["70+"]}명`}
                      />
                      <SC.CustomH3 $size={0.875} children={`${userData.age.ratio["70+"]}%`} />
                    </SC.FlexBox>
                  </>
                )}
              </SC.FlexBox>
            </SC.FlexBox>
          </SC.FlexBox>
        </SC.ChartInner>
      </SC.GridBox>
    </SC.ChartLayout>
  )
}