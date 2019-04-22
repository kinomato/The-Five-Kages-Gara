import { Injectable } from '@angular/core';
import { Hieuxe } from 'src/app/models/hieuxe.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HieuxeService {
  hieuxe: Hieuxe;
  constructor(private fireStore: AngularFirestore) { }
  Submit(data: Hieuxe) {
    this.fireStore.collection('hieuxe').add(data);
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
  getHieuxe(id: string) {
    return this.fireStore.doc('hieuxe/' + id).get();
  }
}
