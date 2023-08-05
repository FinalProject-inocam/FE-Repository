import React from "react";
import { useDeletePurchasesMutation, useGetPurchasesQuery } from "../../redux";

export const MyPage: React.FC = () => {
  const { isLoading, data } = useGetPurchasesQuery({});
  const [onDeletePurchases, query] = useDeletePurchasesMutation({});

  const onClickDeletePurchases = (purchaseId: number) => () => {
    console.log(purchaseId, query);
    onDeletePurchases(purchaseId);
  };

  const { content, type, color, alarm, addressName, zoneNo } = [...data][0];

  if (isLoading) return <div>Loadgin....g...</div>;
  return (
    <div>
      <h2>MyPage</h2>
      <div>
        {data[0] && (
          <>
            {content}
            {type}
            {color}
            {alarm}
            {addressName}
            {zoneNo}
            <button onClick={onClickDeletePurchases(data[0].purchaseId)}>
              취소하기
            </button>
          </>
        )}
      </div>
    </div>
  );
};
