interface NotificationArr {
  purchase: number[];
  approve: number[];
  cancel: number[];
}

interface NotificationNum {
  purchase: number;
  approve: number;
  cancel: number;
}

interface Gender {
  gender: { byGender: number[]; ratio: number[] };
}

interface Age {
  age: { byAge: number[]; ratio: number[] };
}

interface PurchasesGet extends NotificationArr, Gender, Age {}

interface PurchasesGetData {
  total: PurchasesGet;
  model1: PurchasesGet;
  model2: PurchasesGet;
}

interface PurchasesPreData {
  total: NotificationNum;
  model1: NotificationNum;
  model2: NotificationNum;
}

export interface PurchasesChartYear extends PurchasesGetData {
  preYear: PurchasesPreData;
}

export interface PurchasesChartMonth extends PurchasesGetData {
  preMonth: PurchasesPreData;
}

export interface PurchasesChartWeek extends PurchasesGetData {
  preWeek: PurchasesPreData;
}
