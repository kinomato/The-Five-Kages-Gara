import { Component, OnInit } from '@angular/core';
import { PhieutiepnhanService } from '../../services/phieutiepnhan.service';
import { KhachhangService } from 'src/app/services/khachhang.service';
import { XesuaService } from 'src/app/xesua/shared/xesua.service';
import { HieuxeService } from 'src/app/services/hieuxe.service';
import { Phieutiepnhan } from 'src/app/models/phieutiepnhan.model';
import { Xesua } from 'src/app/models/xesua.model';
import { map } from 'rxjs/operators';
import { Observable, observable, BehaviorSubject } from 'rxjs';
import { Khachhang } from 'src/app/models/khachhang.model';
import { Hieuxe } from 'src/app/models/hieuxe.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-phieutiepnhan-list',
  templateUrl: './phieutiepnhan-list.component.html',
  styleUrls: ['./phieutiepnhan-list.component.css']
})
export class PhieutiepnhanListComponent implements OnInit {
  dataList = [];
  phieuList: Phieutiepnhan[];
  searchvalue: string;
  templist = [];
  newList = new BehaviorSubject(null as any);
  isshow = false;
  key = 'bienso'; // set default
  reverse = false;
  p = 1;

  constructor(
    private tiepnhanService: PhieutiepnhanService,
    private khachhangService: KhachhangService,
    private xesuaService: XesuaService,
    private hieuxeService: HieuxeService,
    private toastr: ToastrService
  ) {  }

  ngOnInit() {
    this.getThongtin();
  }
  getThongtin() {
    /* this.tiepnhanService.getThongtins().subscribe(res => {
      this.dataList.push(res);
    }); */
   /*  this.tiepnhanService.getThongtins1().subscribe(res => {
      this.newList.next(res);
    }); */
    this.tiepnhanService.getThongtinsUlt().subscribe(res => {
      console.log('tiepnhan still running');
      this.newList.next(res);
      /* console.log(this.newList.value); */
    });
  }
  onDelete(id: string) {
    if (confirm('are you sure ?')) {
      this.tiepnhanService.Delete(id)
      .then(() => {
        this.toastr.success('Xóa thành công', 'Xóa phiếu nhập');
      },
      () => {
        this.toastr.warning('Bạn không đủ quyền lực', 'Thất bại');
      })
      .catch(err => {
        this.toastr.error('Xóa thất bại', err);
      });
    }
  }
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
}
