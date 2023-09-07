import React, { useRef, useEffect } from "react";
import * as RTK from "../../redux";
import * as COMP from "../../components/myPage";
// import { useRouter } from "../../hooks";
import { styled } from "styled-components";
import * as SC from "../../components";
import * as Type from "../../types";
import { userinfologo, editicon } from "../../assets";

export const MyPage: React.FC = () => {
  const {
    isLoading: PurchasesIsLoading,
    isError: PurchasesIsError,
    data: PurchasesData,
  } = RTK.useGetPurchasesQuery({});

  const {
    isLoading: UserIsLoading,
    isError: UserIsError,
    data: UserData,
  } = RTK.useGetMyPageQuery({});
  if (UserIsLoading || PurchasesIsLoading) <div> 로딩중 </div>;
  else if (UserIsError || PurchasesIsError) <div> 에러 </div>;
  else {
    console.log(UserData, PurchasesData);
  }
  const myPageLayoutRef = useRef<HTMLDivElement | null>(null);
  const userImg = UserData?.profileImg;

  const UserInfo = [
    ["이메일", UserData?.email],
    ["닉네임", UserData?.nickname],
    [
      "전화번호",
      !!UserData?.phoneNumber
        ? UserData?.phoneNumber.replace(
            /^(\d{2,3})(\d{3,4})(\d{4})$/,
            `$1-$2-$3`
          )
        : null,
    ],
    ["출생년도", !!UserData?.birthYear ? UserData?.birthYear : null],
  ];

  useEffect(() => {
    myPageLayoutRef.current &&
      (myPageLayoutRef.current.style.height = `${window.innerHeight}px`);
  }, [myPageLayoutRef]);

  return (
    <div>
      <MyPageLayout
        $gtc="1fr"
        $gtr="205px 1fr"
        $rgap={20}
        ref={myPageLayoutRef}
      >
        <UserLayout>
          <UserBox $gtc="223px 1fr">
            <div style={{ position: "relative" }}>
              <UserImgBox src={userImg} alt="userImg" />
              <UserImgBoxS />
              <UserInfoBoxS>
                <UserNickNameT>{UserData?.nickname}</UserNickNameT>
                {UserData?.gender && (
                  <UserGender>
                    {UserData?.gender === "MAIL" ? "남" : "여"}
                  </UserGender>
                )}
              </UserInfoBoxS>
            </div>

            <UserInfoBoxB $jc={"flex-start"}>
              <UserInfoLogo src={userinfologo} alt="logo" />
              <UserInfoEB>
                <img src={editicon} alt="editicon" />
              </UserInfoEB>
              <SC.FlexBox $fd={"column"} $ai={"none"} $jc={"none"} $gap={10}>
                {UserInfo.map((item, idx) => (
                  <div style={{ display: "flex" }} key={idx}>
                    <UserInfoTN>{item[0]}</UserInfoTN>
                    <UserInfoT>{item[1]}</UserInfoT>
                  </div>
                ))}
              </SC.FlexBox>
            </UserInfoBoxB>
          </UserBox>
        </UserLayout>

        {PurchasesData?.length === 0 ? (
          <PurchasesDataNone>차량 신청 내역이 없습니다.</PurchasesDataNone>
        ) : (
          PurchasesData.map((item: any, idx: number) => (
            <COMP.PurchaseInfo PurchasesData={item} key={idx} />
          ))
        )}
      </MyPageLayout>

      {/* 채팅관련 */}
      <COMP.MyChatRoomArea />
    </div>
  );
};

const MyPageLayout = styled.div<Partial<Type.Styled>>`
  ${SC.Grid}
  width: 100%;
  height: 100vh;
  padding-top: 90px;
`;

const UserLayout = styled.section`
  ${SC.Flex}
  padding-top: 25px;
`;

const UserBox = styled.div<Partial<Type.Styled>>`
  ${SC.Grid}
  height: 100%;
  width: 710px;
  border: 1px solid ${({ theme }) => theme.color.blue};
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
  background-color: white;
`;

const UserImgBox = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px 0 0 10px;
  border-right: 1px solid ${({ theme }) => theme.color.blue};
`;

const UserImgBoxS = styled.div`
  position: absolute;
  width: 100%;
  height: 50%;
  bottom: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
  border-radius: 0px 0px 0px 10px;
`;

const UserInfoBoxS = styled.div`
  display: flex;
  gap: 10px;
  position: absolute;
  bottom: 10px;
  left: 10px;
`;

const UserNickNameT = styled.div`
  ${({ theme }) => theme.font.PretendardR}
  font-size: 16px;
  color: white;
`;

const UserGender = styled.div`
  ${({ theme }) => theme.font.PretendardM}
  ${SC.Flex}
  width: 30px;
  height: 20px;
  color: white;
  font-size: 12px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.blue};
`;

const UserInfoBoxB = styled.div<Partial<Type.Styled>>`
  ${SC.Flex};
  position: relative;
  margin-left: 50px;
`;

const UserInfoLogo = styled.img`
  position: absolute;
  bottom: 14px;
  right: 9px;
`;

const UserInfoEB = styled.div`
  ${SC.Flex}
  width: 32.5px;
  height: 32.5px;
  top: 10px;
  right: 9px;
  position: absolute;
  background: #ffffff;
  border: 1px solid #4c4cff;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
`;

const UserInfoTN = styled.div`
  ${({ theme }) => theme.font.PretendardSB}
  font-size: 16px;
  font-weight: 600;
  width: 120px;
`;

const UserInfoT = styled.div`
  ${({ theme }) => theme.font.PretendardR}
  font-size: 16px;
  color: ${({ theme }) => theme.color.lightgray3};
  width: 100%;
`;

const PurchasesDataNone = styled.div`
  ${({ theme }) => theme.font.PretendardM};
  ${SC.Flex}
  width: 1440px;
  height: 40px;
  margin: 0 auto;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.color.gray2};
  border-radius: 10px;
  font-size: 16px;
`;
