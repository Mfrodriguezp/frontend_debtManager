import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ManagerDebtsComponent } from './components/manager-debts/manager-debts.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';

const routes: Routes = [
  {
    path:'login',
    component:HomeComponent
  },
  {
    path:'managerDebts',
    component:ManagerDebtsComponent
  },
  {
    path:'**',
    component:ErrorPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
