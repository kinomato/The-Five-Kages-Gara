import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Phutung } from 'src/app/models/phutung.model';

@Injectable({
  providedIn: 'root'
})
export class PhutungService {
  phutung: Phutung;

  constructor(private fireStore: AngularFirestore) { }

  Submit(data: Phutung) {
    this.fireStore.collection('phutung').add(data);
  }
  Update(id: string, data: NgForm ) {
    this.fireStore.collection('phutung').doc(id).update(data);
  }
  Delete(id: string) {
    this.fireStore.collection('phutung').doc(id).delete();
  }
  getPhutungs() {
    return this.fireStore.collection('phutung').snapshotChanges();
  }
  getPhutung(id: string) {
    return this.fireStore.doc('phutung/' + id).get();
  }
}
