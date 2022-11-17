import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public userName: any;

  constructor(
    private _autService: AuthService,
    private _router: Router
  ) {
    this.userName = localStorage.getItem('username');
  }

  ngOnInit(): void {
  }

  logout() {
    return this._autService.logout().subscribe((response) => {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      setTimeout(() => {
        this._router.navigate(['/login']);
      }, 3000);
    });
  }

}
