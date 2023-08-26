import React from "react";
import * as RTK from "../../redux";
import * as Type from "../../types";
import * as COMP from "../../components/myPage";
import { useRouter } from "../../hooks";

export const MyPage: React.FC = () => {
  // 회원정보 조회
  const {
    isLoading: UserIsLoading,
    isError: UserIsError,
    data: UserData,
  } = RTK.useGetMyPageQuery({});
  if (UserIsLoading) <div> 로딩중 </div>;
  else if (UserIsError) <div> 에러 </div>;
  else {
    console.log(UserData);
  }

  // 신청한 차 정보 조회
  const { isLoading, data } = RTK.useGetPurchasesQuery({});

  // 신청한 차 신청 취소
  const [onDeletePurchases] = RTK.useDeletePurchasesMutation({});
  const onClickDeletePurchases = (purchaseId: number) => () => {
    onDeletePurchases(purchaseId);
  };

  const {onNavigate} = useRouter()

  if (isLoading) return <div>Loadgin....g...</div>;

  console.log(UserData);
  return (
    <div>
      <h2>MyPage</h2>
      <button onClick={onNavigate({url:'/chat'})}>채팅으로 이동하기</button>
      <div>
        <COMP.EditUser
          profileImg={UserData.profileImg}
          nickname={UserData.nickname}
          phoneNumber={UserData.phoneNumber}
        />
        {data &&
          data.map(
            ({
              purchaseId,
              type,
              color,
              alarm,
              content,
              addressName,
              zoneNo,
            }: Type.CarOrderRes) => (
              <div key={purchaseId}>
                <COMP.EditPurchase
                  purchaseId={purchaseId}
                  type={type}
                  color={color}
                  alarm={alarm}
                  content={content}
                  addressName={addressName}
                  zoneNo={zoneNo}
                />
                <button onClick={onClickDeletePurchases(purchaseId)}>
                  취소하기
                </button>
              </div>
            )
          )}
      </div>
    </div>
  );
};
