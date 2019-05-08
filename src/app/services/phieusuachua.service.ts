import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { CTPhieusuachua } from 'src/app/models/ct-phieusuachua.model';
import { forEach } from '@angular/router/src/utils/collection';
import { PhieutiepnhanService } from 'src/app/services/phieutiepnhan.service';
import { Phieutiepnhan } from 'src/app/models/phieutiepnhan.model';
import { reject } from 'q';
import { PhutungService } from './phutung.service';

@Injectable({
  providedIn: 'root'
})
export class PhieusuachuaService {

  constructor(
    private fireStore: AngularFirestore,
    private tiepnhanService: PhieutiepnhanService,
    private phutungService: PhutungService) { }
  async Submit(data: any) {
    try {
      const docref = await this.fireStore.collection('suachua').add(data);
      return docref.id;
    } catch (err) {
      console.log('submit phieusuachua' + err);
      return '';
    }
  }
  ctSubmit(id: string, ctdata: CTPhieusuachua[]) {
    ctdata.forEach(ctphieusuachua => {
      const data = Object.assign({}, ctphieusuachua);
      delete data.idctsuachua;
      this.fireStore.collection('suachua/' + id + '/ctsuachua').add(data)
      .then(() => {
        const sl = data.phutung.soluongconlai - data.soluong;
        const newObj = Object.assign({}, data.phutung);
        newObj.soluongconlai = sl;
        this.phutungService.Update(newObj.idphutung, newObj);
      });
    });
  }
  Update(id: string, data: any ) {
    this.fireStore.collection('suachua').doc(id).update(data);
  }
  ctUpdate(id: string, ctdata: CTPhieusuachua[], deletelist: string[]) {
    deletelist.forEach(idct => {
      this.fireStore.collection('suachua/' + id + '/ctsuachua').doc(idct).delete();
    });
    ctdata.forEach(ctphieusuachua => {
      const data = Object.assign({}, ctphieusuachua);
      const idct = ctphieusuachua.idctsuachua;
      delete data.idctsuachua;
      if (idct === '' || idct === undefined || idct === null) {
        this.fireStore.collection('suachua/' + id + '/ctsuachua').add(data);
      } else {
        this.fireStore.collection('suachua/' + id + '/ctsuachua').doc(idct).update(data);
      }
    });
  }
  Delete(id: string) {
    this.DeleteSub(id);
    this.fireStore.collection('suachua').doc(id).delete()
    .then(() => {
      this.changeWhendeleted(id);
    });
  }
  ctDelete(id: string, idct: string) {
    this.fireStore.collection('suachua/' + id + '/ctsuachua').doc(idct).delete();
  }
  // delete subcollection ctsuachua trong document
  DeleteSub(id) {
    this.fireStore.collection('suachua' + id + 'ctsuachua').snapshotChanges()
    .subscribe(actionArray => {
      actionArray.map(item => {
        this.fireStore.collection('suachua' + id + 'ctsuachua').doc(item.payload.doc.id).delete()
        .catch(rejected => console.log(rejected));
      });
    },
    err => console.log('oh no' + err));
  }
  changeWhendeleted(id: string) {
    this.tiepnhanService.getTiepnhanQuery2(id).subscribe(actionArray => {
      return actionArray.map(item => {
        const idphieutiepnhan = item.payload.doc.id;
        const data = Object.assign({}, item.payload.doc.data());
        this.changePhieutiepnhanMinus(idphieutiepnhan, data);
      });
    });
  }
  changePhieutiepnhanMinus(idphieutiepnhan: string, data: any) {
    const newObj = Object.assign({}, data);
    delete newObj.idsuachua;
    delete newObj.tienno;
    newObj.suachuastt = false;
    newObj.tiennostt = false;
    newObj.idsuachua = '';
    newObj.tienno = 0;
    this.tiepnhanService.Update(idphieutiepnhan, newObj);
  }
  changePhieutiepnhan(id: string, data: Phieutiepnhan, tongtien: number) {
    const newObj = Object.assign({}, data);
    delete newObj.idphieutiepnhan;
    newObj.suachuastt = true;
    newObj.tiennostt = true;
    newObj.tienno = tongtien;
    newObj.idsuachua = id;
    this.tiepnhanService.Update(data.idphieutiepnhan, newObj);
  }
  getPhieusuachuas() {
    return this.fireStore.collection('suachua').snapshotChanges();
  }
  getPhieusuachua(id: string) {
    return this.fireStore.collection('suachua').doc(id).valueChanges();
  }
  getCTphieusuachuas(iddoc: string) {
    return this.fireStore.collection('suachua').doc(iddoc).collection('ctsuachua').snapshotChanges();
  }
  getCTphieusuachua(iddoc: string, idsubdoc: string) {
    return this.fireStore.doc('suachua/' + iddoc).collection('ctsuachua').doc(idsubdoc).valueChanges();
  }
  getPhieutiepnhan(bienso?: string) {
    return this.tiepnhanService.getTiepnhanQuery(bienso);
  }
}
