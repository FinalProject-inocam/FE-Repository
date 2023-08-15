import React from "react";
import { useDeletePurchasesMutation, useGetPurchasesQuery } from "../../redux";
import { EditPurchase } from "../../components/myPage/EditPurchase";
import * as Type from "../../types";

export const MyPage: React.FC = () => {
  const { isLoading, data } = useGetPurchasesQuery({});
  console.log("MyPage", data);
  
  const [onDeletePurchases, query] = useDeletePurchasesMutation({});

  const onClickDeletePurchases = (purchaseId: number) => () => {
    console.log(purchaseId, query);
    onDeletePurchases(purchaseId);
  };

  if (isLoading) return <div>Loadgin....g...</div>;

  return (
    <div>
      <h2>MyPage</h2>
      <div>
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
                <EditPurchase
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
