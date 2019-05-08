import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Khachhang } from 'src/app/models/khachhang.model';
import { isNgTemplate } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class KhachhangService {
  khachhang: Khachhang;

  constructor(private fireStore: AngularFirestore) { }
  Submit(data: Khachhang) {
    this.fireStore.collection('khachhang').add(data);
  }
  submitAndReturnId(data: Khachhang) {
    return this.fireStore.collection('khachhang').add(data)
   .then(docref => {
     return docref.id;
   })
   .catch(err => {
     console.log('Oh no you suck again' + err);
     return '';
   });
 }
  Update(id: string, data: NgForm) {
    this.fireStore.collection('khachhang').doc(id).update(data);
  }
  Delete(id: string) {
    this.fireStore.collection('khachhang').doc(id).delete();
  }
  getKhachhangs() {
    return this.fireStore.collection('khachhang').snapshotChanges();
  }
  getKhachhang(id: string) {
    return this.fireStore.doc('khachhang/' + id).get();
  }
  Find(data: Khachhang) {
    return  this.fireStore.collection('khachhang', ref => {
      return ref.limit(1).where('tenkhachhang', '==', data.tenkhachhang)
        .where('dienthoai', '==', data.dienthoai);
    }).get();
  }
}
