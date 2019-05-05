import { Injectable } from '@angular/core';
import { PhieutiepnhanService } from 'src/app/services/phieutiepnhan.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { KhachhangService } from 'src/app/services/khachhang.service';
import { ToastrService } from 'ngx-toastr';
import { flatMap, map } from 'rxjs/operators';
import { Phieutiepnhan } from 'src/app/models/phieutiepnhan.model';

@Injectable({
  providedIn: 'root'
})
export class PhieuthutienService {

  constructor(
    private tiepnhanService: PhieutiepnhanService,
    private fireStore: AngularFirestore,
    private khachhangService: KhachhangService,
    private toastr: ToastrService
  ) { }
  getPhieutiepnhans() {
    return this.tiepnhanService.getTiepnhanspt().pipe(
      flatMap(res => {
        return res.map(item => {
          /* console.log(item.payload.doc.data()); */
          return {
            idphieutiepnhan: item.payload.doc.id,
            ...item.payload.doc.data()
          } as Phieutiepnhan;
        });
      }),
      flatMap(res1 => {
        return this.khachhangService.getKhachhang(res1.idkhachhang).pipe(
          map(res2 => {
            const datakhach = res2.data();
            return Object.assign(res1, datakhach);
          })
        );
      })
    );
  }
  async Submit(data: any) {
    try {
      const docref = await this.fireStore.collection('thutien').add(data);
      return docref.id;
    } catch (err) {
      console.log('submit phieusuachua' + err);
      return '';
    }
  }
  Update(id: string, data: any) {
    this.fireStore.collection('thutien').doc(id).update(data);
  }
  Delete(id: string) {
    /* this.DeleteSub(id); */
    this.fireStore.collection('thutien').doc(id).delete();
    /* .then(() => {
      this.changeWhendeleted(id);
    }); */
  }
  changePhieutiepnhan(id: string, data: any, tienthu: number) {
    const newobj = Object.assign({} as Phieutiepnhan, data);
    delete newobj.tenkhachhang;
    delete newobj.diachi;
    delete newobj.dienthoai;
    newobj.idthutien = id;
    newobj.thutienstt = true;
    newobj.tienno = newobj.tienno - tienthu;
    if (newobj.tienno === 0) {
      newobj.tiennostt = false;
    }
    this.tiepnhanService.Update(data.idphieutiepnhan, newobj);
  }
  getPhieuthutien(id: string) {
    return this.fireStore.collection('thutien').doc(id).valueChanges();
  }
  getPhieuthutiens() {
    return this.fireStore.collection('thutien').snapshotChanges();
  }
  getPhieutiepnhan(bienso?: string) {
    return this.tiepnhanService.getTiepnhanQuery(bienso);
  }
}
