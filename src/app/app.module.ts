import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PersonComponent } from './person/person.component';
import {ExpenseService} from './expense/expense-service.service';
import {RefundService} from './refund/refund.service';


@NgModule({
  declarations: [
    AppComponent,
    PersonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    ExpenseService,
    RefundService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
