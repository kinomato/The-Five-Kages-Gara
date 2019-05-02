import { Injectable } from '@angular/core';
import { PhieutiepnhanService } from 'src/app/phieutiepnhan/shared/phieutiepnhan.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { KhachhangService } from 'src/app/khachhang/shared/khachhang.service';
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
  Submit(data: any) {
    this.fireStore.collection('thutien').add(data)
    .catch(rejected => console.log(rejected))
    .finally(() => {
      this.toastr.success('Submited Succesful!', 'Thu tiền');
    });
  }
}
