import { Component, OnInit } from '@angular/core';
import { PhieutiepnhanService } from '../../services/phieutiepnhan.service';
import { KhachhangService } from 'src/app/services/khachhang.service';
import { XesuaService } from 'src/app/xesua/shared/xesua.service';
import { HieuxeService } from 'src/app/services/hieuxe.service';
import { Phieutiepnhan } from 'src/app/models/phieutiepnhan.model';
import { Xesua } from 'src/app/models/xesua.model';
import { map } from 'rxjs/operators';
import { Observable, observable } from 'rxjs';
import { Khachhang } from 'src/app/models/khachhang.model';
import { Hieuxe } from 'src/app/models/hieuxe.model';

@Component({
  selector: 'app-phieutiepnhan-list',
  templateUrl: './phieutiepnhan-list.component.html',
  styleUrls: ['./phieutiepnhan-list.component.css']
})
export class PhieutiepnhanListComponent implements OnInit {
  dataList = [];
  phieuList: Phieutiepnhan[];

  constructor(
    private tiepnhanService: PhieutiepnhanService,
    private khachhangService: KhachhangService,
    private xesuaService: XesuaService,
    private hieuxeService: HieuxeService
  ) {  }

  ngOnInit() {
    this.getThongtin();
  }
  getThongtin() {
    this.tiepnhanService.getThongtins().subscribe(res => {
      this.dataList.push(res);
      /* console.log('im still running'); */
    });
  }
  onDelete(id: string) {
    if (confirm('are you sure ?')) {
      this.tiepnhanService.Delete(id);
    }
  }
}
