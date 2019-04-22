import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  /* @Output() myClick = new EventEmitter<Employee>(); */
  employeeList: Employee[];
  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getEmployees();
  }
  /* onClick(employee: Employee) {
    this.myClick.emit(employee);
  } */
  getEmployees() {
    this.employeeService.getEmployees().subscribe(actionArray => {
      this.employeeList = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data() } as Employee;
      });
    });
  }
  onDelete(id: string) {
    if (confirm('are you sure ?')) {
      this.employeeService.Delete(id);
    }
  }
}
