import { Component, OnInit } from '@angular/core';
import { Employee } from './shared/employee.model';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  currentEmployee: Employee;
  constructor() { }

  ngOnInit() {
  }
  employeeSelected(employee: Employee) {
    this.currentEmployee = employee;
  }
}
