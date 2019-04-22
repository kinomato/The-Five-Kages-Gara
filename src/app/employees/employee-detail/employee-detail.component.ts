import { Component, OnInit, Input } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  employee: Employee;
  /* @Input() employee: Employee; */
  constructor(
    private employeeService: EmployeeService,
    private location: Location,
    private activetedRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    this.getEmployee();
  }
  onSave(form: NgForm) {
    /* const id = form.value.id; */
    const id = this.activetedRoute.snapshot.paramMap.get('id'); // id: string
    console.log(id);
    const data = Object.assign({}, form.value);
    /* delete data.id; */
    this.employeeService.Update(id, data);
  }
  getEmployee() {
    const id = this.activetedRoute.snapshot.paramMap.get('id'); // id: string
    console.log(id);
    this.employeeService.getEmployee(id)
    .subscribe(res => {
      this.employee = res.data() as Employee;
    });
  }
  goBack() {
    this.location.back();
  }
}
