import { Component, OnInit } from '@angular/core';
import { Khachhang } from 'src/app/models/khachhang.model';
import { KhachhangService } from '../shared/khachhang.service';

@Component({
  selector: 'app-khachhang-list',
  templateUrl: './khachhang-list.component.html',
  styleUrls: ['./khachhang-list.component.css']
})
export class KhachhangListComponent implements OnInit {

  khachhangList: Khachhang[];
  constructor(private khachHangService: KhachhangService) { }

  ngOnInit() {
    this.getkhachHangs();
  }
  getkhachHangs() {
    this.khachHangService.getKhachhangs().subscribe(actionArray => {
      this.khachhangList = actionArray.map(item => {
        return {
          idkhachhang: item.payload.doc.id,
          ...item.payload.doc.data() } as Khachhang;
      });
    });
  }
  onDelete(id: string) {
    if (confirm('are you sure ?')) {
      this.khachHangService.Delete(id);
    }
  }
}
