import { FC } from "react";
import { styled } from "styled-components";
import * as SC from "../css";
import { carOrderLogo } from "../../assets";
import * as RTK from "../../redux";
import { Styled } from "../../types";
import { useSelector } from "react-redux";
import { useRouter } from "../../hooks";

export const InnoCarOrderDone: FC = () => {
  const { nickname } = RTK.useAppSelector(RTK.selectDecode);
  const orderInfo = useSelector(RTK?.selectInnoCarOrder);
  const userInfo = [
    [
      ["이름", orderInfo?.name],
      ["출생년도", orderInfo?.birthYear],
    ],
    [
      ["성별", orderInfo?.gender],
      ["전화번호", orderInfo?.phoneNumber],
    ],
    ["주소", orderInfo?.addressName],
    [
      ["사용용도", orderInfo?.usage ? orderInfo?.usage : "응답 안함"],
      ["메일링서비스", orderInfo?.alarm ? "받음" : "받지 않음"],
    ],
  ];

  const carTrimPrice: any = {
    "INNO I Air": "500800000",
    "INNO I Light": "510800000",
  };

  const { onNavigate } = useRouter();

  const onCheckBtnClick = (): void => {
    onNavigate({ url: "/mypage" })();
  };

  const carImg: any = {
    "화이트 (white)":
      "https://finalimgbucket.s3.amazonaws.com/8268c40d-67f7-450e-8b80-e183db3e6456",
    "그레이 (gray)":
      "https://finalimgbucket.s3.amazonaws.com/c7859019-346a-4e00-991a-17f82cff46af",
    "레드 (red)":
      "https://finalimgbucket.s3.amazonaws.com/74477a91-9d38-40b1-b4f2-1be5f69568a6",
    "블랙 (black)":
      "https://finalimgbucket.s3.amazonaws.com/7ad61437-5da9-4438-a156-32bc10b64325",
    "와인 (wine)":
      "https://finalimgbucket.s3.amazonaws.com/3142f3e0-d7b4-4f61-8893-40cae508a85a",
    "옐로우 (yellow)":
      "https://finalimgbucket.s3.amazonaws.com/d377d950-5142-4f0e-9b90-b6224a0266ad",
  };

  return (
    <ResultLayout>
      <ResultBanner>
        <SC.FlexBox $fd="column">
          <img src={carOrderLogo} alt="logo" style={{ marginBottom: "15px" }} />
          <BannerText style={{ marginBottom: "10px" }}>
            {nickname}의 차량 신청이 완료되었습니다
          </BannerText>
          <BannerBtn onClick={onCheckBtnClick}>내 견적 확인하러 가기</BannerBtn>
        </SC.FlexBox>
      </ResultBanner>

      <SC.FlexBox>
        <Section>
          <div>
            <CarOptionLayout>
              <CarPriceTitle $jc={"space-between"}>
                <CarPriceT>차량가격</CarPriceT>
                <CarPriceT $types="num">{orderInfo?.price} 원</CarPriceT>
              </CarPriceTitle>

              <CarTypeTitle>
                <CarPriceT>INNO-Create I</CarPriceT>
              </CarTypeTitle>
              <SC.FlexBox $jc={"space-between"}>
                <CarPriceTS $types="gray">{orderInfo?.trim}</CarPriceTS>
                <CarPriceTS>{carTrimPrice[orderInfo?.trim]}</CarPriceTS>
              </SC.FlexBox>

              <CarTypeTitle>
                <CarPriceT>컬러 선택</CarPriceT>
              </CarTypeTitle>
              <SC.FlexBox $jc={"space-between"} $ai={"end"}>
                <div>
                  <CarPriceTS $types="gray">외장</CarPriceTS>
                  <CarPriceTS>{orderInfo?.color}</CarPriceTS>
                </div>
                <CarPriceTS>
                  {orderInfo?.color.includes === "yellow" ? "80000" : "0"} 원
                </CarPriceTS>
              </SC.FlexBox>
            </CarOptionLayout>

            <CarOptionLayout>
              <CarPriceTitle $jc="flex-start">
                <CarPriceT>사용자정보</CarPriceT>
              </CarPriceTitle>

              <div style={{ marginTop: "10px" }}>
                {userInfo.map((group, index) => (
                  <SC.FlexBox
                    key={index}
                    $jc="flex-start"
                    style={{ marginBottom: "5px" }}
                  >
                    {index === 2 ? (
                      <SC.FlexBox
                        key={index}
                        $gap={55}
                        $jc="flex-start"
                        style={{ marginBottom: "5px" }}
                      >
                        <UserInfoT>{group[0]}</UserInfoT>
                        <UserInfoAT $types="gray">{group[1]}</UserInfoAT>
                      </SC.FlexBox>
                    ) : (
                      group.map((info, subIndex) => (
                        <SC.FlexBox
                          key={subIndex}
                          $gap={55}
                          $jc="flex-start"
                          style={{ marginBottom: "5px" }}
                        >
                          <UserInfoT>{info[0]}</UserInfoT>
                          <UserInfoT $types="gray">{info[1]}</UserInfoT>
                        </SC.FlexBox>
                      ))
                    )}
                  </SC.FlexBox>
                ))}
              </div>
            </CarOptionLayout>
          </div>
        </Section>

        <CarImgLayout>
          <CarPriceT style={{ marginBottom: "10px" }}>INNO-Create I</CarPriceT>
          <CarImgBox src={carImg[orderInfo?.color]} alt="car" />
        </CarImgLayout>
      </SC.FlexBox>
    </ResultLayout>
  );
};

const ResultLayout = styled.div`
  position: absolute;
  padding-top: 90px;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: white;
`;

const ResultBanner = styled.div`
  ${SC.Flex}
  height: 180px;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(243, 243, 255, 1) 100%
  );
`;

const BannerText = styled.div`
  ${({ theme }) => theme.font.PretendardM}
  font-size: 28px;
  font-weight: 600;
`;

const BannerBtn = styled.div`
  ${SC.Flex}
  ${SC.cursor}
  ${({ theme }) => theme.font.PretendardB}
  width: 220px;
  height: 35px;
  font-size: 16px;
  color: white;
  background-color: ${({ theme }) => theme.color.blue};
  border-radius: 10px;
`;

//내용부분
const Section = styled.div`
  ${SC.Flex}
  width: 780px;
  padding: 0 20px;
`;

const CarOptionLayout = styled.div`
  padding-bottom: 10px;
`;

const CarPriceTitle = styled.div<Partial<Styled>>`
  ${SC.Flex}
  padding: 20px 0;
  border-bottom: 1px solid black;
`;

const CarPriceT = styled.div<Partial<Styled>>`
  ${({ theme }) => theme.font.PretendardB}
  font-weight: 600;
  font-size: ${({ $types }) => ($types === "num" ? "24px" : "20px")};
`;

const CarTypeTitle = styled.div`
  padding: 20px 0 10px 0;
`;

const CarPriceTS = styled.div<Partial<Styled>>`
  font-size: 16px;
  font-weight: 600;
  color: ${({ $types, theme }) =>
    $types === "gray" ? theme.color.textColorSub : "black"};
`;

const UserInfoT = styled.div<Partial<Styled>>`
  ${({ theme }) => theme.font.PretendardSB}
  font-size: 16px;
  width: ${({ $types }) => ($types === "gray" ? "180px" : "100px")};
  color: ${({ $types, theme }) =>
    $types === "gray" ? theme.color.textColorSub : "black"};
`;

const UserInfoAT = styled(UserInfoT)`
  width: 500px;
`;

const CarImgLayout = styled.div`
  width: 400px;
  padding: 30px;
  background-color: white;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 15px;
`;

const CarImgBox = styled.img`
  width: 100%;
  border-radius: 10px;
`;
