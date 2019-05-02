import { Component, OnInit } from '@angular/core';
import { Phieutiepnhan } from '../models/phieutiepnhan.model';
import { PhieutiepnhanService } from '../phieutiepnhan/shared/phieutiepnhan.service';

@Component({
  selector: 'app-danhsachxe',
  templateUrl: './danhsachxe.component.html',
  styleUrls: ['./danhsachxe.component.css']
})
export class DanhsachxeComponent implements OnInit {
 dataList = [];
  constructor(
    private tiepnhanService: PhieutiepnhanService,
    ) { }

  ngOnInit() {
    this.getThongtin();
  }
  getThongtin() {
    this.tiepnhanService.getThongtins().subscribe(res => {
      this.dataList.push(res);
      /* console.log('im still running'); */
    });
  }
}
