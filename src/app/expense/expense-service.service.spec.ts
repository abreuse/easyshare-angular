import { TestBed, inject } from '@angular/core/testing';

import { ExpenseService } from './expense-service.service';

describe('ExpenseService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExpenseService]
    });
  });

  it('calculate an expense', () => {
    expect(ExpenseService.calculateExpense(100, 2, 4))
      .toEqual(50);
  });

  it('calculate a decimal expense', () => {
    expect(ExpenseService.calculateExpense(50.5, 1.15, 3))
      .toEqual(19.36);
  })
});
