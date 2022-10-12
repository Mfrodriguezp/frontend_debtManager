import { Component, OnInit } from '@angular/core';
import { CustomersService } from 'src/app/services/customers.service';
import { CustomersModel } from 'src/app/models/customers.interface';
import { faPencilSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-customers-manager',
  templateUrl: './customers-manager.component.html',
  styleUrls: ['./customers-manager.component.css'],
})
export class CustomersManagerComponent implements OnInit {
  public title: String;
  public customersList: CustomersModel[];
  public customer!: CustomersModel;
  public faPencilSquare = faPencilSquare;
  public faTrashCan = faTrashCan;

  constructor(
    private _customerService: CustomersService
    ) {
    this.title = 'Administracion de clientes';
    this.customersList = [];
  }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    return this._customerService.getCustomers().subscribe((results) => {
      this.customersList = results.customers;
    });
  }

  getCustomer(idCustomer:any){
    return this._customerService.getCustomer(idCustomer).subscribe((results)=>{
      this.customer = results.customer[0];
    });
  }

  editCustomer(idcustomer:Number,formEdit:any){

  }
  deleteCustomer(idCustomer:Number){

  }
}
