import { TestBed, inject } from '@angular/core/testing';

import { RefundService } from './refund.service';
import {Person} from '../person/person';

describe('RefundService', () => {

  let persons: Person[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RefundService]
    });
  });

  beforeAll(() => {
    persons = [
      new Person('Foo'),
      new Person('Bar'),
      new Person('Toz')
    ];
  });

  it('init refunds', () => {
    persons = RefundService.initRefunds(persons);
    expect(persons[0].refunds.get('Bar')).toEqual(0);
    expect(persons[0].refunds.get('Toz')).toEqual(0);
  });

  it('set refunds', () => {
    persons[0].checked = false;
    persons[1].checked = true;
    persons[2].checked = true;
    persons = RefundService.setRefunds(persons, 'Foo', 50);
    expect(persons[1].refunds.get('Foo')).toEqual(50);
    expect(persons[2].refunds.get('Foo')).toEqual(50);
  });

  it('recalculate refunds', () => {
    persons[0].checked = true;
    persons[1].checked = false;
    persons[2].checked = false;
    persons = RefundService.setRefunds(persons, 'Bar', 30);
    persons = RefundService.recalculate(persons);
    expect(persons[1].refunds.get('Foo')).toEqual(20);
  });

  it('revert last refund', () => {
    RefundService.revertLastRefund();
    persons = RefundService.recalculate(persons);
    expect(persons[1].refunds.get('Foo')).toEqual(50);
    expect(persons[0].refunds.get('Bar')).toEqual(0);
  })
});
