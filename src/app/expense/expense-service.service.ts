import { Injectable } from '@angular/core';

@Injectable()
export class ExpenseService {

  constructor() { }


  static calculateExpense(expense, tax, nbPersons) {

    if(!this.validateExpenseAndTax(expense, tax))
      return '';

    return parseFloat(((expense * tax) / nbPersons).toFixed(2));
  }


  private static validateExpenseAndTax(expense, tax) {

    const regexp: RegExp = /^\d*[.]?\d*$/;

    if (!regexp.test(expense)) {
      alert('Entrez un montant valide (ex : 10.45)');
      return false;
    }

    if(!regexp.test(tax)) {
      alert('Entrez une taxe valide (ex : 1.15)');
      return false;
    }

    if(expense < 0 || !expense) {
      alert('Le montant doit être supérieur à zéro.');
      return false;
    }

    if(tax < 0 || !tax) {
      alert('La taxe doit être supérieure à zéro.');
      return false;
    }

    return true;
  }


}
