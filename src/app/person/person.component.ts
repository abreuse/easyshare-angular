import { Component, OnInit } from '@angular/core';
import { Person } from '../person';

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

  addPerson() {
    console.log(this.personName);
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
        if (person.name === otherPerson.name) {
          continue;
        }

        person.refunds.refundToPersons.set(otherPerson.name, 0);

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

    const nbOfCheckedPersons = this.getNbOfCheckedPersons();
    const refund = this.expenseValue / nbOfCheckedPersons;

    for (const person of this.persons) {
      if (person.checked) {

        if (person.name === this.selectedPerson) {
          continue;
        }

        if (!person.refunds.refundToPersons.get(this.selectedPerson)) {
          person.refunds.refundToPersons.set(this.selectedPerson, 0);
        }

        let refunds = person.refunds.refundToPersons.get(this.selectedPerson);
        refunds += refund;
        person.refunds.refundToPersons.set(this.selectedPerson, refunds);
      }

      console.log(person.refunds.refundToPersons);
    }

    this.expenseValue = null;
  }


  recalculate() {
    for (const person of this.persons) {
      for (const otherPerson of this.persons) {
        if (person.name === otherPerson.name) {
          continue;
        }

        if (person.refunds.refundToPersons.get(otherPerson.name) > otherPerson.refunds.refundToPersons.get(person.name)) {
          person.refunds.refundToPersons.set(otherPerson.name,
            person.refunds.refundToPersons.get(otherPerson.name) - otherPerson.refunds.refundToPersons.get(person.name));
          otherPerson.refunds.refundToPersons.set(person.name, 0);
          }else {
            otherPerson.refunds.refundToPersons.set(person.name,
              otherPerson.refunds.refundToPersons.get(person.name) - person.refunds.refundToPersons.get(otherPerson.name));
            person.refunds.refundToPersons.set(otherPerson.name, 0);
        }
      }

    }
  }

   getNbOfCheckedPersons(): number {
    let count = 0;

    for (const person of this.persons) {
      if (person.checked) {
        count++;
      }
    }

    return count;
  }

  ngOnInit() {
    this.started = false;
    this.selectedPerson = '';
    this.persons = [];
  }

}
