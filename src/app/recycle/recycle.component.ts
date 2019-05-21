import { Component, OnInit } from '@angular/core';
import { RecycleService } from '../services/recycle.service';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Phieufilter } from '../interfaces/phieufilter';
import { PhieutiepnhanService } from '../services/phieutiepnhan.service';
import { PhieusuachuaService } from '../services/phieusuachua.service';
import { PhieuthutienService } from '../services/phieuthutien.service';
import { PhutungService } from '../services/phutung.service';
import { TiencongService } from '../services/tiencong.service';
import { HieuxeService } from '../services/hieuxe.service';
import { KhachhangService } from '../services/khachhang.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recycle',
  templateUrl: './recycle.component.html',
  styleUrls: ['./recycle.component.css']
})
export class RecycleComponent implements OnInit {
  phieufilter$: Observable<Phieufilter[]>;
  subrecycle: Subscription;
  p = 1;
  temp: Phieufilter[];
  constructor(
    private recycleService: RecycleService,
    private tiepnhanService: PhieutiepnhanService,
    private suachuaService: PhieusuachuaService,
    private thutienService: PhieuthutienService,
    private phutungService: PhutungService,
    private tiencongService: TiencongService,
    private hieuxeService: HieuxeService,
    private khachhangService: KhachhangService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.getThongtin();
  }
  OnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.subrecycle.unsubscribe();
  }
  getThongtin() {
    const tiepnhan$ = this.recycleService.getPhieutiepnhan();
    const suachua$ = this.recycleService.getPhieusuachua();
    const thutien$ = this.recycleService.getPhieuthutien();
    const phutung$ = this.recycleService.getPhutung();
    const tiencong$ = this.recycleService.getTiencong();
    const khachhang$ = this.recycleService.getKhachhang();
    const hieuxe$ = this.recycleService.getHieuxe();
    this.phieufilter$ = combineLatest(tiepnhan$, suachua$, thutien$, phutung$, tiencong$, khachhang$, hieuxe$).pipe(
      map((res) => {
        return this.temp = [...res[0], ...res[1], ...res[2], ...res[3], ...res[4], ...res[5], ...res[6]];
      })
    );
  }
  onRestore(phieufilter: Phieufilter) {
    if (confirm('Khôi phục dữ liệu này ?')) {
      this.recycleService.Restore(phieufilter)
        .then(() => {
          this.toastr.success('Thành công', 'Khôi phục');
        },
          reject => {
            this.toastr.warning('Bạn không đủ quyền lực', 'Thất bại');
          })
        .catch(err => {
          this.toastr.error(err, 'Đã xảy ra lỗi');
        });
    }
  }
  onDelete(phieufilter: Phieufilter) {
    if (confirm('Chức năng này sẽ xóa vĩnh viễn! bạn có chắc ?')) {
      if (phieufilter.type.tiepnhan) {
        this.tiepnhanService.DeleteUlt(phieufilter.idphieu)
          .then(() => {
            this.toastr.success('Thành công', 'Xóa tiếp nhận');
          },
            reject => {
              this.toastr.warning('Bạn không đủ quyền lực', 'Thất bại');
            })
          .catch(err => {
            this.toastr.error(err, 'Đã xảy ra lỗi');
          });
      }
      if (phieufilter.type.suachua) {
        this.suachuaService.DeleteUlt(phieufilter.idphieu)
          .then(() => {
            this.toastr.success('Thành công', 'Xóa sửa chữa');
          },
            reject => {
              this.toastr.warning('Bạn không đủ quyền lực', 'Thất bại');
            })
          .catch(err => {
            this.toastr.error(err, 'Đã xảy ra lỗi');
          });
      }
      if (phieufilter.type.thutien) {
        this.thutienService.DeleteUlt(phieufilter.idphieu).subscribe(whatthis => {
          whatthis.then(() => {
            this.toastr.success('Thành công', 'Xóa thu tiền');
          },
            reject => {
              this.toastr.warning('Bạn không đủ quyền lực', 'Thất bại');
            })
            .catch(err => {
              this.toastr.error(err, 'Đã xảy ra lỗi');
            });
        });
      }
      if (phieufilter.type.phutung) {
        this.phutungService.DeleteUlt(phieufilter.idphieu)
          .then(() => {
            this.toastr.success('Thành công', 'Xóa phụ tùng');
          },
            reject => {
              this.toastr.warning('Bạn không đủ quyền lực', 'Thất bại');
            })
          .catch(err => {
            this.toastr.error(err, 'Đã xảy ra lỗi');
          });
      }
      if (phieufilter.type.tiencong) {
        this.tiencongService.DeleteUlt(phieufilter.idphieu)
          .then(() => {
            this.toastr.success('Thành công', 'Xóa tiền công');
          },
            reject => {
              this.toastr.warning('Bạn không đủ quyền lực', 'Thất bại');
            })
          .catch(err => {
            this.toastr.error(err, 'Đã xảy ra lỗi');
          });
      }
      if (phieufilter.type.hieuxe) {
        this.hieuxeService.DeleteUlt(phieufilter.idphieu)
          .then(() => {
            this.toastr.success('Thành công', 'Xóa hiệu xe');
          },
            reject => {
              this.toastr.warning('Bạn không đủ quyền lực', 'Thất bại');
            })
          .catch(err => {
            this.toastr.error(err, 'Đã xảy ra lỗi');
          });
      }
      if (phieufilter.type.khachhang) {
        this.khachhangService.DeleteUlt(phieufilter.idphieu)
          .then(() => {
            this.toastr.success('Thành công', 'Xóa khách hàng');
          },
            reject => {
              this.toastr.warning('Bạn không đủ quyền lực', 'Thất bại');
            })
          .catch(err => {
            this.toastr.error(err, 'Đã xảy ra lỗi');
          });
      } else {
        this.toastr.info('what this ?', 'New bug ?');
      }
    }
  }
  RestoreAll() {
    if (confirm('Khôi phục toàn bộ ?')) {
      if (this.temp.length !== 0) {
        this.recycleService.RestoreAll(this.temp)
        .then(() => {
          this.toastr.success('Thành công', 'Khôi phục tất cả');
        },
          reject => {
            this.toastr.warning('Bạn không đủ quyền lực', 'Thất bại');
          })
        .catch(err => {
          this.toastr.error(err, 'Đã xảy ra lỗi');
        });
      }
    }
  }
}
