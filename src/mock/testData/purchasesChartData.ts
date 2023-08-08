import * as Type from "../../types";

export const purchasesChartYearData: Type.PurchasesChartYear = {
  total: {
    purchase: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    approve: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
    cancel: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],

    //["male", "female", "company", "unknown"]
    gender: {
      byGender: [30, 30, 30, 30],
      ratio: [25, 25, 25, 25],
    },

    //[”Tens ~ Twenties”, … “OverEighties”]
    age: {
      byAge: [20, 20, 20, 20, 20, 10, 10],
      ratio: [16.8, 16.8, 16.8, 16.8, 16.8, 8, 8],
    },
  },

  model1: {
    purchase: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
    approve: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    cancel: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],

    gender: {
      byGender: [30, 30, 30, 30],
      ratio: [25, 25, 25, 25],
    },

    age: {
      byAge: [20, 20, 20, 20, 20, 10, 10],
      ratio: [16.8, 16.8, 16.8, 16.8, 16.8, 8, 8],
    },
  },

  model2: {
    purchase: [14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14],
    approve: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    cancel: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],

    gender: {
      byGender: [30, 30, 30, 30],
      ratio: [25, 25, 25, 25],
    },

    age: {
      byAge: [20, 20, 20, 20, 20, 10, 10],
      ratio: [16.8, 16.8, 16.8, 16.8, 16.8, 8, 8],
    },
  },

  preYear: {
    total: {
      purchase: 40,
      approve: 36,
      cancel: 4,
    },
    model1: {
      purchase: 20,
      approve: 18,
      cancel: 2,
    },
    model2: {
      purchase: 20,
      approve: 19,
      cancel: 1,
    },
  },
};

export const purchasesChartMonthData: Type.PurchasesChartMonth = {
  total: {
    purchase: [12, 12, 12, 12],
    approve: [10, 10, 10, 10],
    cancel: [2, 2, 2, 2],

    gender: {
      byGender: [10, 10, 10, 10],
      ratio: [25, 25, 25, 25],
    },

    age: {
      byAge: [10, 5, 5, 5, 5, 5, 5],
      ratio: [25, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5],
    },
  },

  model1: {
    purchase: [5, 5, 5, 5],
    approve: [4, 4, 4, 4],
    cancel: [1, 1, 1, 1],

    gender: {
      byGender: [5, 5, 5, 5],
      ratio: [25, 25, 25, 25],
    },

    age: {
      byAge: [3, 3, 3, 3, 3, 3, 2],
      ratio: [15, 15, 15, 15, 15, 15, 10],
    },
  },

  model2: {
    purchase: [5, 5, 5, 5],
    approve: [4, 4, 4, 4],
    cancel: [1, 1, 1, 1],

    gender: {
      byGender: [5, 5, 5, 5],
      ratio: [25, 25, 25, 25],
    },

    age: {
      byAge: [3, 3, 3, 3, 3, 3, 2],
      ratio: [15, 15, 15, 15, 15, 15, 10],
    },
  },

  preMonth: {
    total: {
      purchase: 50,
      approve: 46,
      cancel: 4,
    },
    model1: {
      purchase: 30,
      approve: 28,
      cancel: 2,
    },
    model2: {
      purchase: 20,
      approve: 18,
      cancel: 2,
    },
  },
};

export const purchasesChartWeekData: Type.PurchasesChartWeek = {
  total: {
    purchase: [12, 12, 12, 12, 12, 12, 12],
    approve: [10, 10, 10, 10, 10, 10, 10],
    cancel: [2, 2, 2, 2, 2, 2, 2],

    gender: {
      byGender: [18, 18, 17, 17],
      ratio: [25, 25, 25, 25],
    },

    age: {
      byAge: [10, 10, 10, 10, 10, 10, 10],
      ratio: [14, 14, 14, 14, 14, 14, 16],
    },
  },

  model1: {
    purchase: [5, 5, 5, 5],
    approve: [4, 4, 4, 4],
    cancel: [1, 1, 1, 1],

    gender: {
      byGender: [5, 5, 5, 5],
      ratio: [25, 25, 25, 25],
    },

    age: {
      byAge: [3, 3, 3, 3, 3, 3, 2],
      ratio: [15, 15, 15, 15, 15, 15, 10],
    },
  },

  model2: {
    purchase: [5, 5, 5, 5],
    approve: [4, 4, 4, 4],
    cancel: [1, 1, 1, 1],

    gender: {
      byGender: [5, 5, 5, 5],
      ratio: [25, 25, 25, 25],
    },

    age: {
      byAge: [3, 3, 3, 3, 3, 3, 2],
      ratio: [15, 15, 15, 15, 15, 15, 10],
    },
  },

  preWeek: {
    total: {
      purchase: 50,
      approve: 46,
      cancel: 4,
    },
    model1: {
      purchase: 30,
      approve: 28,
      cancel: 2,
    },
    model2: {
      purchase: 20,
      approve: 18,
      cancel: 2,
    },
  },
};
