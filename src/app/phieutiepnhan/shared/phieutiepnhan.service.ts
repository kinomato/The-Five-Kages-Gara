import { Injectable } from '@angular/core';
import { Phieutiepnhan } from 'src/app/models/phieutiepnhan.model';
import { Hieuxe } from 'src/app/models/hieuxe.model';
import { Khachhang } from 'src/app/models/khachhang.model';
import { Xesua } from 'src/app/models/xesua.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { XesuaService } from 'src/app/xesua/shared/xesua.service';
import { HieuxeService } from 'src/app/hieuxe/shared/hieuxe.service';
import { KhachhangService } from 'src/app/khachhang/shared/khachhang.service';
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
    private xesuaService: XesuaService,
    private hieuxeService: HieuxeService,
    private khachhangService: KhachhangService,
    private toastr: ToastrService
  ) { }
  Submit(dataform: any) {
    const data = Object.assign({}, dataform.value);
    const datakhachhang = Object.assign({}, dataform.value);
    delete datakhachhang.bienso;
    delete datakhachhang.hieuxe;
    this.khachhangService.Find(datakhachhang).subscribe(res => {
      if (res.empty) { // kiểm tra xem queries xong có trả về kết quả nào không
        this.khachhangService.submitAndReturnId(datakhachhang)
          .then(idkhach => {
            const datatiepnhan = Object.assign({}, {
              bienso: data.bienso,
              ngaytiepnhan: data.ngaytiepnhan,
              hieuxe: data.hieuxe,
              idkhachhang: idkhach
            });
            this.fireStore.collection('tiepnhan').add(datatiepnhan);
            /* this.toastr.success('Submitted Succesfully!', 'Tiếp nhận xe'); */
          })
          .catch((err: any) => console.log('lấy idkhachhang bị lỗi' + err));
      } else {
        res.docs.map(item => {
          const datatiepnhan = Object.assign({}, {
            bienso: data.bienso,
            ngaytiepnhan: data.ngaytiepnhan,
            hieuxe: data.hieuxe,
            idkhachhang: item.id
          });
          this.fireStore.collection('tiepnhan').add(datatiepnhan);
          /*  this.toastr.success('Submitted Succesfully!', 'Tiếp nhận xe'); */
        });
      }
    }, err => this.toastr.error(err, 'error'));
  }
  Update(id: string, data: NgForm) {
    this.fireStore.collection('tiepnhan').doc(id).update(data);
  }
  Delete(id: string) {
    this.fireStore.collection('tiepnhan').doc(id).delete();
  }
  getTiepnhans() {
    return this.fireStore.collection('tiepnhan').snapshotChanges();
  }
  getTiepnhan(id: string) {
    return this.fireStore.doc('tiepnhan/' + id).valueChanges();
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
  getThongtin_Test1() {
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
  }
  getThongtin_Test2() {
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
        return this.khachhangService.getKhachhang(res2.idkhachhang).pipe(
          map(datasnapshot => {
            const datakhach = datasnapshot.data() as Khachhang;
            return Object.assign(res2, datakhach);
          })
        );
      }),
      flatMap(res3 => {
        return this.hieuxeService.getHieuxe(res3.idhieuxe).pipe(
          map(hieuxesnap => {
            const dataxe = hieuxesnap.data() as Hieuxe;
            return Object.assign(res3, dataxe);
          })
        );
      })
    );
  }
}
