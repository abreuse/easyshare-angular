import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  constructor() { }

  persons: String[];
  selectedPerson: String;

  addPerson(person) {
    this.persons.push(person);
    console.log(this.persons);
  }

  ngOnInit() {
    this.selectedPerson = '';
    this.persons = [];
    this.persons.push('alexis');
    this.persons.push('Karina');
    this.persons.push('Aminata');
  }

}
