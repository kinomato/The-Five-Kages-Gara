import { Component, OnInit } from '@angular/core';
import { Khachhang } from 'src/app/models/khachhang.model';
import { KhachhangService } from '../../services/khachhang.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-khachhang-list',
  templateUrl: './khachhang-list.component.html',
  styleUrls: ['./khachhang-list.component.css']
})
export class KhachhangListComponent implements OnInit {

  khachhangList: Khachhang[] = [];
  isshow = true;
  constructor(
    private khachHangService: KhachhangService,
    private toastr: ToastrService) { }

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
      this.khachHangService.Delete(id)
      .then(() => {
        this.toastr.success('Xóa thành công', 'Phụ tùng');
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
