import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public title: String;
  public userName: string;
  public password: string;
  constructor(
    private authService: AuthService,
    private _router: Router
  ) {
    this.title = "Titulo de prueba";
    this.userName = "";
    this.password = "";

  }

  ngOnInit(): void {

  }
  login() {
    const dataUser = {
      userName: this.userName,
      password: this.password
    };
    this.authService.login(dataUser).subscribe(() => {
      this._router.navigate(['/managerDebts']);
    });
  }

}
