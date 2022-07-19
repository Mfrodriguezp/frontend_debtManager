import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DebtServiceService } from 'src/app/services/debt-service.service';
import { GetDebts } from 'src/app/models/debts.interface';
import { faPencilSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-manager-debts',
  templateUrl: './manager-debts.component.html',
  styleUrls: ['./manager-debts.component.css']
})
export class ManagerDebtsComponent implements OnInit {
  public token: any;
  public title: String;
  public debtsList: GetDebts[];
  public debt!:GetDebts;
  public faPencilSquare = faPencilSquare;
  public faTrashCan = faTrashCan;
  public debtPayment: Number;

  constructor(
    private _autService: AuthService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _debtService: DebtServiceService
  ) {
    this.title = "Adminstración de deudas";
    this.debtsList =[];
    this.debtPayment = 0;
  }

  ngOnInit() {
    this.isAuth();
    this.getDebts();
  }

  logout() {
    return this._autService.logout().subscribe(response => {
      localStorage.removeItem('token');
      setTimeout(() => {
        this._router.navigate(['/login']);
      }, 3000);
    });
  }

  isAuth() {
    this.token = localStorage.getItem('token');
    if (this.token == null) {
      this.token = 'noToken';
    } else {
      this.token = this.token;
    }
    return this._autService.isAuth(this.token).subscribe(results => {
      if (results.login == "failed") {
        this._router.navigate(['/login']);
      } else {
        console.log(results.login);
      }
    });
  }

  //function for get Debts
  getDebts() {
    this.token = localStorage.getItem('token');
    return this._debtService.getDebts(this.token).subscribe(results => {
      if(results.debts.length > 0){
        this.debtsList = results.debts;
      }
    });
  }
//Function for get debt with id
  getDebt(iddebt:any){
    this.token = localStorage.getItem('token');
    return this._debtService.getDebt(iddebt,this.token).subscribe(results=>{
      if(results.debt.length > 0){
        this.debt = results.debt[0];
      }
    });
  }

  editDebt(iddebt:any,debt:any){
    const params = {
      debtPayment: this.debtPayment,
      debtState:this.debt.debtState,
      debtId : this.debt.iddebts
    };
    this.token = localStorage.getItem('token');
    return this._debtService.editDebt(params.debtId,params,this.token).subscribe(results=>{
      console.log(results);
    });
  }
  //Function for catched value payment input
  catchEvent(event:any){
    let payment = 0;
    payment = parseInt(event.target.value);
    let oldPayment:any = this.debt.debtValue;

    this.debtPayment = oldPayment -payment;
    return this.debtPayment;
  }

}