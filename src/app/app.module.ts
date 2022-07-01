import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ManagerDebtsComponent } from './components/manager-debts/manager-debts.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ValidationDate } from './pipes/dateValidation.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ManagerDebtsComponent,
    ErrorPageComponent,
    ValidationDate
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
