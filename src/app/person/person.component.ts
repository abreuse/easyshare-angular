import { Component, OnInit } from '@angular/core';
import { Person } from '../person';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  constructor() { }

  persons: Person[];
  selectedPerson: String;
  started: boolean;
  personName: String = '';
  expenseValue: any;
  tax: any;

  addPerson() {
    this.persons.push(new Person(this.personName));
    this.personName = null;
  }

  init() {
    if (this.persons.length < 2) {
      alert('Ajoutez au minimum 2 personnes !');
      return;
    }

    this.selectedPerson = this.persons[0].name;
    this.started = true;

    for (const person of this.persons) {
      for (const otherPerson of this.persons) {
        if (person.name === otherPerson.name)
          continue;

        person.refunds.set(otherPerson.name, 0);
      }
      person.checked = true;
    }

    this.selectedPerson = this.persons[0].name;
  }


  addRefundsForCheckedPersons() {

    const regexp: RegExp = /^\d*[.]?\d*$/;

    if (!regexp.test(this.expenseValue)) {
      alert('Entrez un nombre valide (ex : 10.45)');
      return;
    }

    if(this.tax == undefined)
      this.tax = 1;

    else if(!regexp.test(this.tax)) {
      alert('Entrez une taxe valide (ex : 1.15)');
      return;
    }

    const nbOfCheckedPersons = this.getNbOfCheckedPersons();
    const refund = this.expenseValue * this.tax / nbOfCheckedPersons;

    for (const person of this.persons) {
      if (person.checked) {

        if (person.name === this.selectedPerson)
          continue;

        if (!person.refunds.get(this.selectedPerson))
          person.refunds.set(this.selectedPerson, 0);

        let refunds = person.refunds.get(this.selectedPerson);
        refunds += refund;
        person.refunds.set(this.selectedPerson, refunds);
      }
    }
    this.expenseValue = null;
  }


  recalculate() {
    for (const person of this.persons) {
      for (const otherPerson of this.persons) {

        if (person.name === otherPerson.name)
          continue;

        if (person.refunds.get(otherPerson.name) > otherPerson.refunds.get(person.name)) {
          person.refunds.set(otherPerson.name,
            person.refunds.get(otherPerson.name) - otherPerson.refunds.get(person.name));
          otherPerson.refunds.set(person.name, 0);
        }
        else {
          otherPerson.refunds.set(person.name,
            otherPerson.refunds.get(person.name) - person.refunds.get(otherPerson.name));
          person.refunds.set(otherPerson.name, 0);
        }
      }
    }
  }

   getNbOfCheckedPersons(): number {
    let count = 0;

    for (const person of this.persons)
      if (person.checked)
        count++;

    return count;
  }

  ngOnInit() {
    this.started = false;
    this.selectedPerson = '';
    this.persons = [];
  }
}
