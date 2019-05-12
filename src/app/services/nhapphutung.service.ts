import { Injectable } from '@angular/core';
import { FirebaseFirestore } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { CTNhapphutung } from '../models/ct-nhapphutung.model';
import { PhutungService } from './phutung.service';
import * as firebase from '@angular/fire';

@Injectable({
  providedIn: 'root'
})
export class NhapphutungService {

  constructor(
    private fireStore: AngularFirestore,
    private phutungService: PhutungService) { }
  async Submit(data: any) {
    try {
      const docref = await this.fireStore.collection('nhapphutung').add(data);
      return docref.id;
    } catch (err) {
      console.log('submit nhập phụ tùng' + err);
      return '';
    }
  }
  ctSubmit(id: string, ctdata: CTNhapphutung[]) {
    ctdata.forEach(ctphutung => {
      const data = Object.assign({}, ctphutung);
      delete data.idctnhappt;
      this.fireStore.collection('nhapphutung/' + id + '/ctnhapphutung').add(data)
      .then(() => {
        const sl = data.phutung.soluongconlai + data.soluong;
        const newObj = Object.assign({}, data.phutung);
        newObj.soluongconlai = sl;
        this.phutungService.Update(newObj.idphutung, newObj);
      });
    });
  }
  Update(id: string, data: any ) {
    this.fireStore.collection('nhapphutung').doc(id).update(data);
  }
  Delete(id: string) {
    this.DeleteSub(id);
    this.fireStore.collection('nhapphutung').doc(id).delete();
  }
  DeleteSub(id) {
    this.fireStore.collection('nhapphutung' + id + 'ctnhapphutung').snapshotChanges()
    .subscribe(actionArray => {
      actionArray.map(item => {
        this.fireStore.collection('nhapphutung' + id + 'ctnhapphutung').doc(item.payload.doc.id).delete()
        .catch(rejected => console.log(rejected));
      });
    },
    err => console.log('oh no' + err));
  }
  getNhapphutungs() {
    return this.fireStore.collection('nhapphutung').snapshotChanges();
  }
}
