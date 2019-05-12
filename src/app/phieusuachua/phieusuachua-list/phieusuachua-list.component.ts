import { Component, OnInit } from '@angular/core';
import { PhieusuachuaService } from '../../services/phieusuachua.service';
import { Phieusuachua } from 'src/app/models/phieusuachua.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-phieusuachua-list',
  templateUrl: './phieusuachua-list.component.html',
  styleUrls: ['./phieusuachua-list.component.css']
})
export class PhieusuachuaListComponent implements OnInit {
  suachuaList: Phieusuachua[];

  constructor(
    private suachuaService: PhieusuachuaService,
    private toastr: ToastrService,
    ) { }

  ngOnInit() {
    this.getSuachuas();
  }
  getSuachuas() {
    this.suachuaService.getPhieusuachuas().subscribe(res => {
      return this.suachuaList = res.map(item => {
        return {
          idphieusuachua: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Phieusuachua;
      });
    });
  }
  onDelete(id: string) {
    if (confirm('Are you sure ?')) {
      this.suachuaService.DeleteUlt(id)
      .then(() => {
        this.suachuaService.changeWhendeleted(id);
        this.toastr.success('Xóa thành công', 'Phiếu sửa chữa');
      },
      reject => {
        this.toastr.error('Bạn không đủ quyền lực', 'Thất bại');
      })
      .catch(err => {
        this.toastr.error('Đã xảy ra lỗi', err);
      });
    }
  }
}
