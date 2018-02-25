import { Component, OnInit } from '@angular/core';
import { Person } from './person';
import { DecimalPipe } from '@angular/common';
import {ExpenseService} from '../expense/expense-service.service';
import {RefundService} from '../refund/refund.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  constructor(private expenseService: ExpenseService, private refundService: RefundService) {}

  persons: Person[];
  selectedPerson: String;
  started: boolean;
  personName: String = '';
  expenseValue: any;
  tax: any;

  ngOnInit() {
    this.started = false;
    this.selectedPerson = '';
    this.clearPersons();
  }

  clearPersons() {
    this.persons = [];
  }

  init() {
    if (this.persons.length < 2) {
      alert('Ajoutez au minimum 2 personnes !');
      return;
    }

    this.selectedPerson = this.persons[0].name;
    this.started = true;
    this.tax = 1;

    for (const person of this.persons)
      person.checked = true;

    this.persons = RefundService.initRefunds(this.persons);
    RefundService.initRefundHistory();
  }


  addPerson() {
    this.persons.push(new Person(this.personName));
    this.personName = null;
  }


  addRefundsForCheckedPersons() {

    if(this.tax == undefined)
      this.tax = 1;

    const refund = ExpenseService.calculateExpense(this.expenseValue, this.tax, this.getNbOfCheckedPersons());

    if(!refund)
      return '';

    this.persons = RefundService.setRefunds(this.persons, this.selectedPerson, refund, true);

    this.expenseValue = null;
  }


  getNbOfCheckedPersons(): number {
    return this.persons.filter(person => person.checked).length;
  }

  hasRefundHistory() {
    return RefundService.hasRefundHistory();
  }

  revertLastRefund() {
    RefundService.revertLastRefund();
    //this.recalculate();
  }

  recalculate() {
    this.persons = RefundService.recalculate(this.persons);
  }
}
