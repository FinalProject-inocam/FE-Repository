export interface CarOrderInfo {
  type: string;
  color: string;
  alarm: boolean;
  content: string;
  addressName: string;
  zoneNo: string;
}

export interface CarOrderRes extends CarOrderInfo {
  purchaseId: number;
}
