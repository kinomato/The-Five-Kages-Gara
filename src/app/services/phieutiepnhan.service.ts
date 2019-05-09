import { Injectable } from '@angular/core';
import { Phieutiepnhan } from 'src/app/models/phieutiepnhan.model';
import { Hieuxe } from 'src/app/models/hieuxe.model';
import { Khachhang } from 'src/app/models/khachhang.model';
import { Xesua } from 'src/app/models/xesua.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { XesuaService } from 'src/app/xesua/shared/xesua.service';
import { HieuxeService } from 'src/app/services/hieuxe.service';
import { KhachhangService } from 'src/app/services/khachhang.service';
import { mergeMap, flatMap, map, switchMap } from 'rxjs/operators';
import { observable, forkJoin, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PhieutiepnhanService {
  phieutiepnhan: Phieutiepnhan;
  hieuxe: Hieuxe;
  khachhang: Khachhang;
  xesua: Xesua;
  anyList: Observable<Phieutiepnhan[]>;
  phieuList: Phieutiepnhan[];
  constructor(
    private fireStore: AngularFirestore,
    private hieuxeService: HieuxeService,
    private khachhangService: KhachhangService,
    private toastr: ToastrService
  ) { }
  Submit(dataform: any) {
    const data = Object.assign({}, dataform.value);
    const datakhachhang = Object.assign({}, dataform.value);
    delete datakhachhang.bienso;
    delete datakhachhang.hieuxe;
    delete datakhachhang.ngaytiepnhan;
    return this.khachhangService.Find(datakhachhang).subscribe(res => {
      if (res.empty) { // kiểm tra xem queries xong có trả về kết quả nào không
        this.khachhangService.submitAndReturnId(datakhachhang)
          .then(idkhach => {
            const datatiepnhan = Object.assign({}, {
              bienso: data.bienso,
              ngaytiepnhan: data.ngaytiepnhan,
              hieuxe: data.hieuxe,
              idkhachhang: idkhach,
              suachuastt: false,
              tiennostt: false,
              thutienstt: false,
              idsuachua: '',
              tienno: 0,
              idthutien: ''
            });
            return this.fireStore.collection('tiepnhan').add(datatiepnhan)
            .then(() => {
              this.toastr.success('Thêm thành công', 'Tiếp nhận xe');
            })
            .catch(err => {
              this.toastr.error('Thêm thất bại', err);
            });
          })
          .catch(err => {
            this.toastr.error('Lỗi trong quá trình submit', err);
          });
      } else {
        res.docs.map(item => {
          const datatiepnhan = Object.assign({}, {
            bienso: data.bienso,
            ngaytiepnhan: data.ngaytiepnhan,
            hieuxe: data.hieuxe,
            idkhachhang: item.id,
            suachuastt: false,
            tiennostt: false,
            thutienstt: false,
            idsuachua: '',
            tienno: 0,
            idthutien: ''
          });
          return this.fireStore.collection('tiepnhan').add(datatiepnhan)
          .then(() => {
            this.toastr.success('Thêm thành công', 'Tiếp nhận xe');
          })
          .catch(err => {
            this.toastr.error('Thêm thất bại', err);
          });
        });
      }
    }, err => this.toastr.error(err, 'error'));
  }
  Update(id: string, data: any) {
    /* console.log(id);
    console.log(data); */
    this.fireStore.collection('tiepnhan').doc(id).update(data)
    .then(() => {
      this.toastr.success('Cập nhật thành công', 'Cập nhật phiếu nhập');
    })
    .catch(err => {
      this.toastr.error('Cập nhật thất bại', err);
    });
  }
  Delete(id: string) {
    this.fireStore.collection('tiepnhan').doc(id).delete()
    .then(() => {
      this.toastr.warning('Xóa thành công', 'Xóa phiếu nhập');
    })
    .catch(err => {
      this.toastr.error('Xóa thất bại', err);
    });
  }
  getTiepnhans() {
    return this.fireStore.collection('tiepnhan').snapshotChanges();
  }
  getTiepnhansps() {
    return this.fireStore.collection('tiepnhan', ref => {
      return ref.where('suachuastt', '==', false);
    }).snapshotChanges();
  }
  getTiepnhanspt() {
    return this.fireStore.collection('tiepnhan', ref => {
      return ref.where('suachuastt', '==', true)
      /* .orderBy('suachuastt')
                .startAt(true).endAt(true) */
                .where('thutienstt', '==', false);
    }).snapshotChanges();
  }
  getTiepnhan(id: string) {
    return this.fireStore.doc('tiepnhan/' + id).valueChanges();
  }
  getTiepnhanQuery(bienso?: string) {
    return this.fireStore.collection('tiepnhan', ref => {
      return ref.limit(1).where('bienso', '==', bienso);
      /* .where('hieuxe', '==', hieuxe)
      .where('idkhachhang', '==', idkhachhang); */
    }).snapshotChanges();
  }
  getTiepnhanQuery2(idsuachua: string) {
    return this.fireStore.collection('tiepnhan', ref => {
      return ref.limit(1).where('idsuachua', '==', idsuachua);
    }).snapshotChanges();
  }
  getThongtin(id: string) {
    return this.getTiepnhan(id).pipe(
      flatMap((res: Phieutiepnhan) => {
        return this.khachhangService.getKhachhang(res.idkhachhang).pipe(
          map(res2 => {
            const datakhach = res2.data();
            return Object.assign(res, datakhach);
          })
        );
      })
    );
  }
  getThongtins() {
    return this.getTiepnhans().pipe(
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
        /* console.log(res1); */
        return this.khachhangService.getKhachhang(res1.idkhachhang).pipe(
          map(res2 => {
            const datakhach = res2.data();
            return Object.assign(res1, datakhach);
          })
        );
      })
    );
  }
  /* getThongtin_Test1() {
    return this.getTiepnhans().pipe(
      flatMap(res => {
        return res.map(item => {
          return {
            idphieutiepnhan: item.payload.doc.id,
            ...item.payload.doc.data()
          } as Phieutiepnhan;
        });
      }),
      flatMap(res1 => {
        return this.xesuaService.getXesua(res1.idxesua).pipe(
          map((xesua: Xesua) => {
            return Object.assign(res1, xesua);
          })
        );
      }),
      flatMap(res2 => {
        return forkJoin(
          this.khachhangService.getKhachhang(res2.idkhachhang),
          this.hieuxeService.getHieuxe(res2.idhieuxe)
        ).pipe(
          map(([res3, res4]) => {
            const datakhach = res3.data();
            const datahieuxe = res4.data();
            return Object.assign(res2, datakhach, datahieuxe);
          })
        );
      }),
    );
  } */
}
