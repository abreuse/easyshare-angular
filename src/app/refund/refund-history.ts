import {Person} from '../person/person';

export class RefundHistory {

  lastRefund: any;
  persons: Person[];
  lastSelectedPerson: string;

  constructor(persons: Person[], lastSelectedPerson: string, lastRefund: any) {
    this.lastRefund = lastRefund;
    this.persons = persons;
    this.lastSelectedPerson = lastSelectedPerson;
  }
}
