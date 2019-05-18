import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Hieuxe } from 'src/app/models/hieuxe.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { CustomResObjectList } from 'src/app/interfaces/custom-res-object-list';
import { combineLatest, Subscription } from 'rxjs';
import { Phieufilter } from '../interfaces/phieufilter';
import { map } from 'rxjs/operators';

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
    return this.fireStore.collection('hieuxe').add(data);
  }
  Update(id: string, data: Hieuxe ) {
    const batch = this.fireStore.firestore.batch();
    const hieuxe = data.hieuxe;
    const tiepnhan$ = this.getPhieutiepnhan(data.hieuxe);
    const thutien$ = this.getPhieuthutien(data.hieuxe);
    return combineLatest(tiepnhan$, thutien$)
    .pipe(
      map(res => {
        return [...res[0], ...res[1]] as Phieufilter[];
      }),
      map(res1 => {
        res1.forEach(phieu => {
          const pref = this.fireStore.collection(phieu.collection).doc(phieu.idphieu).ref;
          batch.update(pref, { hieuxe });
        });
        const xeref = this.fireStore.collection('hieuxe').doc(id).ref;
        batch.update(xeref, { hieuxe });
        return batch.commit();
      })
    );
  }
  getPhieutiepnhan(hieuxe: string) {
    return this.fireStore.collection('tiepnhan', ref => {
      return ref.where('hieuxe', '==', hieuxe);
    }).snapshotChanges()
    .pipe(
      map(res => {
        return res.map(item => {
          return {
            idphieu: item.payload.doc.id,
            collection: 'tiepnhan'
          } as Phieufilter;
        });
      })
    );
  }
  getPhieuthutien(hieuxe: string) {
    return this.fireStore.collection('thuien', ref => {
      return ref.where('hieuxe', '==', hieuxe);
    }).snapshotChanges()
    .pipe(
      map(res => {
        return res.map(item => {
          return {
            idphieu: item.payload.doc.id,
            collection: 'thutien'
          } as Phieufilter;
        });
      })
    );
  }
  Delete(id: string) {
    const batch = this.fireStore.firestore.batch();
    const khref = this.fireStore.collection('hieuxe').doc(id).ref;
    batch.update(khref, { isdelete: true });
    return batch.commit();
  }
  DeleteUlt(id: string) {
    const batch = this.fireStore.firestore.batch();
    const khref = this.fireStore.collection('hieuxe').doc(id).ref;
    batch.delete(khref);
    return batch.commit();
  }
  getHieuXes() {
    return this.fireStore.collection('hieuxe', ref => {
      return ref.where('isdelete', '==', false);
    }).snapshotChanges();
  }
  /* getHieuxes() {
    return this.http.get<CustomResObjectList>(this.path);
  } */
  getHieuxe(id: string) {
    return this.fireStore.doc('hieuxe/' + id).get();
  }
}
