import { Component, OnInit } from '@angular/core';
import { Khachhang } from 'src/app/models/khachhang.model';
import { KhachhangService } from '../../services/khachhang.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-khachhang-list',
  templateUrl: './khachhang-list.component.html',
  styleUrls: ['./khachhang-list.component.css']
})
export class KhachhangListComponent implements OnInit {

  khachhangList$: Observable<Khachhang[]>;
  isshow = true;
  subkhachhang: Subscription;
  p = 1;
  constructor(
    private khachHangService: KhachhangService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.getkhachHangs();
  }
  OnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    /* this.subkhachhang.unsubscribe(); */
  }
  getkhachHangs() {
    this.khachhangList$ = this.khachHangService.getKhachhangs().pipe(
      map(actionArray => {
        return actionArray.map(item => {
          return {
            idkhachhang: item.payload.doc.id,
            ...item.payload.doc.data() } as Khachhang;
        });
      })
    );
  }
  onDelete(id: string) {
    if (confirm('are you sure ?')) {
      this.khachHangService.Delete(id)
      .then(() => {
        this.toastr.success('Đã thêm vào thùng rác', 'Khách hàng');
        this.isshow = true;
      },
      reject => {
        this.toastr.warning('Bạn không có quyền', 'Thất bại');
        this.isshow = true;
      })
      .catch(err => {
        this.toastr.error(err, 'Đã xảy ra lỗi');
        this.isshow = true;
      });
    }
  }
}
