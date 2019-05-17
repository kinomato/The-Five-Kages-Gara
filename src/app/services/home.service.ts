import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { mergeMap, flatMap, map, switchMap } from 'rxjs/operators';
import { observable, forkJoin, Observable, combineLatest, of } from 'rxjs';
import { Phieutiepnhan } from '../models/phieutiepnhan.model';
import { Phieufilter } from '../interfaces/phieufilter';
import { Phieusuachua } from '../models/phieusuachua.model';
import { Phieuthutien } from '../models/phieuthutien.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  currentdate = new Date();
  thang = this.currentdate.getMonth() + 1;

  constructor(private fireStore: AngularFirestore) { }

  getPhieutiepnhan(ngay: any, usemonth: boolean) {
    return this.fireStore.collection('tiepnhan', ref => {
      return (ngay === true) ? ref.where('ngaytiepnhan.month', '==', this.thang) : ref.where('ngaytiepnhan.day', '==', ngay);
    }).valueChanges()
      .pipe(
        map((res: Phieutiepnhan[]) => {
          if (res.length !== 0) {
            return res.map(item => {
              return {
                phieu: item,
                bienso: item.bienso,
                ngay: item.ngaytiepnhan,
                type: { tiepnhan: true, thutien: false, suachua: false }
              } as Phieufilter;
            });
          } else {
            console.log('tiepnhan failed');
            return [];
          }
        })
      );
  }
  getPhieusuachua(ngay: any, usemonth: boolean) {
    return this.fireStore.collection('suachua', ref => {
      return (ngay === true) ? ref.where('ngaysuachua.month', '==', this.thang) : ref.where('ngaysuachua.day', '==', ngay);
    }).valueChanges()
      .pipe(
        map((res: Phieusuachua[]) => {
          if (res.length !== 0) {
            return res.map(item => {
              return {
                phieu: item,
                bienso: item.bienso,
                ngay: item.ngaysuachua,
                type: { tiepnhan: false, thutien: false, suachua: true }
              } as Phieufilter;
            });
          } else {
            console.log('suachua failed');
            return [];
          }
        })
      );
  }
  getPhieuthutien(ngay: any, usemonth: boolean) {
    return this.fireStore.collection('thutien', ref => {
      return (ngay === true) ? ref.where('ngaythutien.month', '==', this.thang) : ref.where('ngaythutien.day', '==', ngay);
    }).valueChanges()
      .pipe(
        map((res: Phieuthutien[]) => {
          if (res.length !== 0) {
            return res.map(item => {
              return {
                phieu: item,
                bienso: item.bienso,
                ngay: item.ngaythutien,
                type: { tiepnhan: false, thutien: true, suachua: false }
              } as Phieufilter;
            });
          } else {
            console.log('thutien failed');
            return [];
          }
        })
      );
  }
}
