import { FC } from "react";
import { styled } from "styled-components";
import * as SC from "../css";
import * as Type from "../../types";

export const PurchaseInfo: FC<any> = ({ PurchasesData }) => {
  const ProcessList = ["출고신청", "출고접수", "출고진행", "출고완료"];

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

  const userInfoArray = [
    ["성함", PurchasesData?.name],
    [
      "전화번호",
      PurchasesData?.phoneNumber.replace(
        /^(\d{2,3})(\d{3,4})(\d{4})$/,
        `$1-$2-$3`
      ),
    ],
    ["주소", PurchasesData?.addressName],
  ];

  const carInfoArray = [
    ["색상", PurchasesData?.color],
    [
      "문의사항",
      String(PurchasesData?.content).length >= 22
        ? String(PurchasesData?.content).substring(0, 22) + "..."
        : PurchasesData?.content,
    ],
    ["메일알림", PurchasesData?.alarm ? "승인" : "차단"],
  ];

  return (
    <>
      <PILayout $gtc="1fr 1fr 1fr">
        <ApproveBox $jc="flex-start" $fd="column">
          <SC.FlexBox $gap={5}>
            <ApproveT>신청 ID : {PurchasesData?.purchaseId}</ApproveT>
            <ApproveT $types="blue">
              {PurchasesData?.createdAt.replace(/[T].*/, "")} 접수
            </ApproveT>
          </SC.FlexBox>

          <ApproveProcess>
            {ProcessList.map((item, idx) => (
              <ProcessBox key={idx}>
                <ProcessCirCle
                  $state={
                    !PurchasesData?.approve && idx === 0
                      ? true
                      : PurchasesData?.approve && idx === 1
                      ? true
                      : false
                  }
                />
                <ProcessT
                  $state={
                    !PurchasesData?.approve && idx === 0
                      ? true
                      : PurchasesData?.approve && idx === 1
                      ? true
                      : false
                  }
                >
                  {item}
                </ProcessT>
              </ProcessBox>
            ))}

            <ProcessLine />
          </ApproveProcess>
        </ApproveBox>

        <div style={{ position: "relative" }}>
          <CarImg src={carImg[PurchasesData?.color]} alt="car" />
          <CarImgBoxS />
          <CarImgName>{PurchasesData?.type}</CarImgName>
        </div>

        <CarOrderInfo $ai={"flex-start"} $fd={"column"} $gap={4}>
          <UserInfoBox $ai={"flex-start"} $fd={"column"} $gap={4} $state={true}>
            {userInfoArray.map((item, idx) => (
              <SC.FlexBox $jc={"flex-start"} $ai={"flex-start"} key={idx}>
                <PurchasesInfoN>{item[0]}</PurchasesInfoN>
                <PurchaseInfoT>{item[1]}</PurchaseInfoT>
              </SC.FlexBox>
            ))}
          </UserInfoBox>

          <UserInfoBox $ai={"flex-start"} $fd={"column"} $gap={4}>
            {carInfoArray.map((item, idx) => (
              <SC.FlexBox $jc={"flex-start"} $ai={"flex-start"} key={idx}>
                <PurchasesInfoN>{item[0]}</PurchasesInfoN>
                {item[0] === "메일알림" ? (
                  <EmailAgreeBox $types={item[1]}>{item[1]}</EmailAgreeBox>
                ) : (
                  <PurchaseInfoT>{item[1]}</PurchaseInfoT>
                )}
              </SC.FlexBox>
            ))}
          </UserInfoBox>
        </CarOrderInfo>
      </PILayout>
    </>
  );
};

const PILayout = styled.div<Partial<Type.Styled>>`
  ${SC.Grid}
  height: 230px;
  width: 1440px;
  margin: 0 auto;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.color.gray2};
  border-radius: 10px;
`;

const ApproveBox = styled.div<Partial<Type.Styled>>`
  ${SC.Flex}
  padding-top: 30px;
  width: 100%;
  height: 100%;
  border-radius: 10px 0 0 10px;
`;

const ApproveT = styled.div<Partial<Type.Styled>>`
  ${({ theme }) => theme.font.PretendardB};
  font-size: 16px;
  font-weight: 600;
  color: ${({ $types, theme }) =>
    $types === "blue" ? theme.color.blue : "#494949"};
`;

const ApproveProcess = styled.div`
  ${SC.Flex}
  margin-top: 28px;
  height: 60px;
  width: 400px;
`;

const ProcessLine = styled.div`
  position: absolute;
  width: 305px;
  height: 2px;
  background-color: ${({ theme }) => theme.color.lightgray0};
`;

const ProcessBox = styled.div`
  ${SC.Flex}
  position: relative;
  width: 25%;
  height: 100%;
  z-index: 5;
`;

const ProcessCirCle = styled.div<Partial<Type.Styled>>`
  width: 20px;
  height: 20px;
  background-color: white;
  border: 4px solid
    ${({ theme, $state }) =>
      $state ? theme.color.blue : theme.color.lightgray0};
  border-radius: 50%;
  box-shadow: ${({ $state }) =>
    $state ? "0px 0px 10px rgba(76,76,255, 0.7)" : "none"};
`;

const ProcessT = styled.div<Partial<Type.Styled>>`
  ${({ theme }) => theme.font.PretendardM};
  position: absolute;
  bottom: -20px;
  font-size: 16px;
  color: ${({ theme, $state }) => ($state ? theme.color.blue : "#494949")};
`;

const CarImg = styled.img`
  width: 100%;
  height: 230px;
  object-fit: cover;
`;

const CarImgBoxS = styled.div`
  position: absolute;
  width: 100%;
  height: 50%;
  top: 0;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
`;

const CarImgName = styled.div`
  ${({ theme }) => theme.font.PretendardB};
  position: absolute;
  top: 16px;
  left: 20px;
  font-size: 16px;
  font-weight: 600;
  color: white;
`;

const CarOrderInfo = styled.div<Partial<Type.Styled>>`
  ${SC.Flex}
  height: 230px;
  padding-left: 25px;
`;

const UserInfoBox = styled.div<Partial<Type.Styled>>`
  ${SC.Flex}
  width: 380px;
  padding: 10px 0 10px 19px;
  border-radius: 10px;
  background-color: ${({ theme, $state }) =>
    $state ? theme.color.lightgray1 : "none"};
`;

const PurchasesInfoN = styled.div`
  ${({ theme }) => theme.font.PretendardSB};
  width: 100px;
  font-size: 16px;
  color: black;
`;

const PurchaseInfoT = styled.div`
  width: 240px;
  font-size: 16px;
  color: ${({ theme }) => theme.color.lightgray3};
`;

const EmailAgreeBox = styled.div<Partial<Type.Styled>>`
  ${({ theme }) => theme.font.PretendardM};
  ${SC.Flex}
  width: 50px;
  height: 22px;
  border-radius: 12px;
  background-color: ${({ theme, $types }) =>
    $types === "승인" ? theme.color.blue : theme.color.red};

  color: white;
  font-size: 14px;
`;
