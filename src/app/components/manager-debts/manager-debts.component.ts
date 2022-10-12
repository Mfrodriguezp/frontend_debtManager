import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DebtServiceService } from 'src/app/services/debt-service.service';
import {
  GetDebts,
  GetCustomers,
  CreateDebtModel,
} from 'src/app/models/debts.interface';
import { faPencilSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-manager-debts',
  templateUrl: './manager-debts.component.html',
  styleUrls: ['./manager-debts.component.css'],
})
export class ManagerDebtsComponent implements OnInit, OnDestroy {
  public token: any;
  public title: String;
  public debtsList: GetDebts[];
  public debt!: GetDebts;
  public createDebt: CreateDebtModel;
  public faPencilSquare = faPencilSquare;
  public faTrashCan = faTrashCan;
  public debtPayment: Number;
  public suscription: Subscription | undefined;
  public sumDebts: Number;
  public customerList: GetCustomers[];

  constructor(
    private _autService: AuthService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _debtService: DebtServiceService
  ) {
    this.title = 'Adminstración de deudas';
    this.debtsList = [];
    this.debtPayment = 0;
    this.sumDebts = 0;
    this.customerList = [];
    this.createDebt = new CreateDebtModel('', 0);
  }

  ngOnInit() {
    this.isAuth();
    this.getDebts();
    this.getTotalDebts();

    //Refresh realTime debts
    this.suscription = this._debtService.refresh$.subscribe(() => {
      this.getDebts();
    });
  }

  ngOnDestroy(): void {
    this.suscription?.unsubscribe();
  }

  isAuth() {
    this.token = localStorage.getItem('token');
    if (this.token == null) {
      this.token = 'noToken';
    } else {
      this.token = this.token;
    }
    return this._autService.isAuth(this.token).subscribe((results) => {
      if (results.login == 'failed') {
        this._router.navigate(['/login']);
      } else {
        console.log(results.login);
      }
    });
  }

  //function for get Debts
  getDebts() {
    this.token = localStorage.getItem('token');
    return this._debtService.getDebts(this.token).subscribe((results) => {
      if (results.debts.length > 0) {
        this.debtsList = results.debts;
      }
    });
  }
  //Function for get debt with id
  getDebt(iddebt: any) {
    this.token = localStorage.getItem('token');
    return this._debtService
      .getDebt(iddebt, this.token)
      .subscribe((results) => {
        if (results.debt.length > 0) {
          this.debt = results.debt[0];
        }
      });
  }

  getTotalDebts() {
    return this._debtService.getTotalDebts().subscribe((results) => {
      this.sumDebts = results.totalDebts[0].totalDebts;
    });
  }

  setDebt(formDebt: any) {
    return this._debtService.setDebt(this.createDebt).subscribe((results) => {
      if (results.status == 200) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Se ha creado una nueva deuda',
          showConfirmButton: false,
          timer: 3000,
        });
      }
    });
  }

  editDebt(iddebt: any, debt: any) {
    const params = {
      debtPayment: this.debtPayment,
      debtState: this.debt.debtState,
      debtId: this.debt.iddebt,
    };
    this.token = localStorage.getItem('token');
    return this._debtService
      .editDebt(params.debtId, params, this.token)
      .subscribe((results) => {
        if (results.status == 200) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'La deuda se ha modificado de manera correcta',
            showConfirmButton: false,
            timer: 3000,
          });
        }
      });
  }

  deleteDebt(iddebt: any) {
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
        this._debtService.deleteDebt(iddebt).subscribe(response=>{
            Swal.fire(
              'Eliminado!',
              'El registro ha sido eliminado correctamente',
              'success'
            );
        });
      }
    })
  }

  getCustomers() {
    this.token = localStorage.getItem('token');
    return this._debtService.getCustomers().subscribe((results) => {
      this.customerList = results.customers;
    });
  }
  //Function for catched value payment input
  catchEvent(event: any) {
    let payment = 0;
    payment = parseInt(event.target.value);
    let oldPayment: any = this.debt.debtValue;

    this.debtPayment = oldPayment - payment;
    return this.debtPayment;
  }
}
