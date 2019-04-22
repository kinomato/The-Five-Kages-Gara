import { Component, OnInit, Input } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { Form, NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Employee } from '../shared/employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employee: Employee = this.employeeService.employee;

  constructor(public employeeService: EmployeeService) {
   }

  ngOnInit() {
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.employee = {
      id: null,
      fullname: '',
      position: '',
      empCode: '',
      mobile: '',
    };
  }
  onSubmit(form: NgForm) {
    const data = form.value;
    this.employeeService.Submit(data);
    this.resetForm(form);
  }
}
