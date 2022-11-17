export interface CustomersModel{
  idcustomers: Number,
  customerName: String,
  phoneNumber: String
}

export class CreateCustomerModel{
  constructor(
    public customerName: String,
    public phoneNumber: String
  ){}
}
