import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
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
  public faPencilSquare = faPencilSquare;
  public faTrashCan = faTrashCan;

  constructor(
    private _autService: AuthService,
    private _router: Router,
    private _debtService: DebtServiceService
  ) {
    this.title = "Adminstración de deudas";
    this.debtsList =[];
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
        alert(results.login);
      }
    });
  }

  getDebts() {
    this.token = localStorage.getItem('token');
    return this._debtService.getDebts(this.token).subscribe(results => {
      if(results.debts.length > 0){
        this.debtsList = results.debts;
      }
    });
  }

}