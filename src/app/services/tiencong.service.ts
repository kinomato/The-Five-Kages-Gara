import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Tiencong } from 'src/app/models/tiencong.model';

@Injectable({
  providedIn: 'root'
})
export class TiencongService {
  tiencongList: Tiencong[];

  constructor(private fireStore: AngularFirestore) { }
  Submit(data: Tiencong) {
    return this.fireStore.collection('tiencong').add(data);
  }
  Update(id: string, data: NgForm ) {
    return this.fireStore.collection('tiencong').doc(id).update(data);
  }
  Delete(id: string) {
    return this.fireStore.collection('tiencong').doc(id).delete();
  }
  getTiencongs() {
    return this.fireStore.collection('tiencong').snapshotChanges();
  }
  getTiencong(id: string) {
    return this.fireStore.doc('tiencong/' + id).get();
  }
}
