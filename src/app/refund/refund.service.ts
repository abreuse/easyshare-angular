import { Injectable } from '@angular/core';
import {Person} from '../person';

@Injectable()
export class RefundService {

  constructor() { }

  static initRefunds(persons: Person[]) {
    for (const person of persons) {
      for (const otherPerson of persons) {
        if (person.name === otherPerson.name)
          continue;

        person.refunds.set(otherPerson.name, 0);
      }
    }

    return persons;
  }


  static setRefunds(persons: Person[], selectedPerson, refund) {
    for (const person of persons) {
      if (person.checked) {

        if (person.name === selectedPerson)
          continue;

        let refunds = person.refunds.get(selectedPerson);
        refunds += refund;
        person.refunds.set(selectedPerson, refunds);
      }
    }

    return persons;
  }


  static recalculate(persons: Person[]) {
    for (const myself of persons) {
      for (const other of persons) {

        if (myself.name === other.name)
          continue;

        if (this.iOweMore(myself, other)) {
          myself.refunds.set(other.name, this.calculateTheDifferenceOwed(myself, other));
          other.refunds.set(myself.name, 0);
        }
        else {
          other.refunds.set(myself.name, this.calculateTheDifferenceOwed(other, myself));
          myself.refunds.set(other.name, 0);
        }
      }
    }

    return persons;
  }

  private static iOweMore(myself: Person, other: Person) {
    return myself.refunds.get(other.name) > other.refunds.get(myself.name);
  }

  private static calculateTheDifferenceOwed(pers1: Person, pers2: Person) {
    return pers1.refunds.get(pers2.name) - pers2.refunds.get(pers1.name);
  }
}
