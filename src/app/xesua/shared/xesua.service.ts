import { Injectable } from '@angular/core';
import { AngularFirestore, fromDocRef } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Xesua } from 'src/app/models/xesua.model';

@Injectable({
  providedIn: 'root'
})
export class XesuaService {
  xesuaList: Xesua[];
  xesua: Xesua;
  constructor(private fireStore: AngularFirestore) { }
  Submit(data: Xesua) {
    this.fireStore.collection('xesua').add(data);
  }
  submitAndReturnId(data: any) {
    return this.fireStore.collection('xesua').add(data)
    .then(docref => {
      return docref.id;
    })
    .catch(err => {
      console.log('submit and return idxesua fail' + err);
      return '';
    });
  }
  Update(id: string, data: NgForm ) {
    this.fireStore.collection('xesua').doc(id).update(data);
  }
  Delete(id: string) {
    this.fireStore.collection('xesua').doc(id).delete();
  }
  getXesuas() {
    return this.fireStore.collection('xesua').snapshotChanges();
  }
  getXesua(id: string) {
    return this.fireStore.doc('xesua/' + id).valueChanges();
  }
}
