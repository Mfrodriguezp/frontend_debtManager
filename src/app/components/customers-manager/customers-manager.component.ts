import { Component, OnDestroy, OnInit } from '@angular/core';
import { CustomersService } from 'src/app/services/customers.service';
import { AuthService } from 'src/app/services/auth.service';
import { CustomersModel, CreateCustomerModel } from 'src/app/models/customers.interface';
import { faPencilSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-customers-manager',
  templateUrl: './customers-manager.component.html',
  styleUrls: ['./customers-manager.component.css'],
})
export class CustomersManagerComponent implements OnInit, OnDestroy {
  public title: String;
  public customersList: CustomersModel[];
  public customer!: CustomersModel;
  public createCustomer: CreateCustomerModel;
  public faPencilSquare = faPencilSquare;
  public faTrashCan = faTrashCan;
  public token: any;
  public suscription: Subscription | undefined;

  constructor(
    private _customerService: CustomersService,
    private _autService: AuthService
    ) {
    this.title = 'Administracion de clientes';
    this.customersList = [];
    this.createCustomer = new CreateCustomerModel("","");
  }

  ngOnInit(): void {
    this.getCustomers();
    this.suscription = this._customerService.refresh$.subscribe(() => {
      this.getCustomers();
    });
  }

  ngOnDestroy(): void {
    this.suscription?.unsubscribe();
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

  setCustomer(formDebt: any) {
    this.token=localStorage.getItem('token');
    return this._customerService.setCustomer(this.createCustomer,this.token).subscribe((results) => {
      if (results.status == 201) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'El cliente se ha creado correctamente',
          showConfirmButton: false,
          timer: 3000,
        });
      }
    });
  }

  editCustomer(idcustomer:any){
    const params = {
      customerId: this.customer.idcustomers,
      customerName: this.customer.customerName,
      phoneNumber: this.customer.phoneNumber
    };
    this.token=localStorage.getItem('token');
    return this._customerService.editCustomer(idcustomer,params,this.token).subscribe((results)=>{
      if (results.status == 201) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'La información se ha actualizado correctamente',
          showConfirmButton: false,
          timer: 3000,
        });
      }
    })

  }
  deleteCustomer(idCustomer:Number){
    Swal.fire({
      title: 'Estas seguro?',
      text: "Una vez eliminado, no se puede recuperar la información",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.token=localStorage.getItem('token');
        console.log("test");
          this._customerService.deleteCustomer(idCustomer,this.token).subscribe(response=>{
            Swal.fire(
              'Eliminado!',
              'El registro ha sido eliminado correctamente',
              'success'
            );
        },error=>{
          Swal.fire(
            'Error!',
            'No es posible eliminar el registro',
            'error'
          );
        });
      }
    })
  }
}
