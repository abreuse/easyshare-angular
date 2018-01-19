import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PersonComponent } from './person/person.component';
import { ExpenseComponent } from './expense/expense.component';


@NgModule({
  declarations: [
    AppComponent,
    PersonComponent,
    ExpenseComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
