interface PostDataType {
  purchaseId: number;
  type: string;
  price: number;
  color: string;
  alarm: boolean;
  content: string;
  addressName: string;
  zoneNo: string;
  approve: boolean;
  denyMessage: string;
  deliveryDate: string;
  createdAt: string;
  modifiedAt: string;
}

export const postCarOderData: PostDataType[] = [
  {
    purchaseId: 1,
    type: "carType",
    price: 100000,
    color: "color",
    alarm: true,
    content: "content",
    addressName: "대한민국",
    zoneNo: "123",
    approve: true,
    denyMessage: "denyMessage",
    deliveryDate: "2023-08-05",
    createdAt: "2023-08-05",
    modifiedAt: "2023-08-05",
  },
  {
    purchaseId: 2,
    type: "carType2",
    price: 200000,
    color: "color2",
    alarm: true,
    content: "content2",
    addressName: "대한민국2",
    zoneNo: "1232",
    approve: true,
    denyMessage: "denyMessage2",
    deliveryDate: "2023-08-05",
    createdAt: "2023-08-05",
    modifiedAt: "2023-08-05",
  },
];
