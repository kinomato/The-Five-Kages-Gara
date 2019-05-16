import { Component, OnInit } from '@angular/core';
import { Phieutiepnhan } from '../models/phieutiepnhan.model';
import { PhieutiepnhanService } from '../services/phieutiepnhan.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-danhsachxe',
  templateUrl: './danhsachxe.component.html',
  styleUrls: ['./danhsachxe.component.css']
})
export class DanhsachxeComponent implements OnInit {
  dataList = [];
  datasub = new BehaviorSubject(null as any);
  searchvalue: any;
  number: number;
  key = 'bienso'; // set default
  reverse = false;
  p = 1;
  constructor(
    private tiepnhanService: PhieutiepnhanService,
  ) { }

  ngOnInit() {
    /* this.getThongtin(); */
    this.getThongtinnew();
  }
  getThongtin() {
    this.tiepnhanService.getTiepnhans().subscribe(res => {
      this.dataList = res.map(item => {
        return {
          idphieutiepnhan: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Phieutiepnhan;
      });
    });
  }
  getThongtinnew() {
    this.tiepnhanService.getThongtinsUlt().subscribe(res => {
      console.log('danhsachxe still running');
      this.datasub.next(res);
    });
  }
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
}
