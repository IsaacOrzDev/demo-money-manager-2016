export const successResponse = {
    status: "success",
    data: {}
};

export const errorResponse = {
    status: "error",
    error: {}
};

export const userModel = {
    username: "",
    email: "",
    password: ""
};

export const userInfoModel = {
    currency: "",
    defaultAccount: ""
};

export const accountModel = {
    name: "",
    balance: 0,
    income: 0,
    expense: 0
};

export const transactionModel = {
    docDate: "",
    title: "",
    type: "",
    account: "",
    category: "",
    amount: 0,
    detail: []
};