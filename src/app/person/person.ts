import { Refund } from '../refund/refund';

export class Person {

  name: String;
  checked: boolean;
  refunds: Map<String, number>;

  constructor(name) {
    this.name = name;
    this.refunds = new Map();
  }

}
