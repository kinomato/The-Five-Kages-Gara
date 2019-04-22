import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employee: Employee;

  constructor(private fireStore: AngularFirestore) { }
  Submit(data: Employee) {
    this.fireStore.collection('employee').add(data);
  }
  Update(id: Employee['id'], data: NgForm ) {
    this.fireStore.collection('employee').doc(id).update(data);
  }
  Delete(id: string) {
    this.fireStore.collection('employee').doc(id).delete();
  }
  getEmployees() {
    return this.fireStore.collection('employee').snapshotChanges();
  }
  getEmployee(id: string) {
    return this.fireStore.doc('employee/' + id).get();
  }
}
