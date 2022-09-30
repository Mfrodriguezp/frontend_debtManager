export interface GetDebts {
    iddebt: Number,
    idcustomers: Number,
    customerName: String,
    debtValue: Number,
    debtState: String,
    dateDebt: Date,
    paymentDate: Date
}

export interface GetCustomers {
  idcustomers: Number,
  customerName: String,
  phoneNumer: String
}

export class CreateDebtModel{
  constructor(
    public customerName: String,
    public debtValue: Number
  ){}
}
