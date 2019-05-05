import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Hieuxe } from 'src/app/models/hieuxe.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { CustomResObjectList } from 'src/app/interfaces/custom-res-object-list';

@Injectable({
  providedIn: 'root'
})
export class HieuxeService {
  hieuxe: Hieuxe;
  constructor(
    private fireStore: AngularFirestore,
    private http: HttpClient,
    ) { }
  private path = 'https://firestore.googleapis.com/v1beta1/projects/cloud-firestore-test-f68a5/databases/(default)/documents/hieuxe/';
  Submit(data: Hieuxe) {
    this.fireStore.collection('hieuxe').add(data);
  }
  Submit1(data: Hieuxe) {
    this.http.post(this.path, data).subscribe(res => {
      console.log(res);
    });
  }
  Update(id: string, data: NgForm ) {
    this.fireStore.collection('hieuxe').doc(id).update(data);
  }
  Delete(id: string) {
    this.fireStore.collection('hieuxe').doc(id).delete();
  }
  getHieuXes() {
    return this.fireStore.collection('hieuxe').snapshotChanges();
  }
  getHieuxes() {
    return this.http.get<CustomResObjectList>(this.path);
  }
  getHieuxe(id: string) {
    return this.fireStore.doc('hieuxe/' + id).get();
  }
}
