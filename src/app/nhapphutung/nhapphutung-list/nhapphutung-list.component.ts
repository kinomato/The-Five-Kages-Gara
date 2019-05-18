import { Component, OnInit } from '@angular/core';
import { Nhapphutung } from 'src/app/models/nhapphutung.model';
import { NhapphutungService } from 'src/app/services/nhapphutung.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nhapphutung-list',
  templateUrl: './nhapphutung-list.component.html',
  styleUrls: ['./nhapphutung-list.component.css']
})
export class NhapphutungListComponent implements OnInit {
  nhapptList: Nhapphutung[] = [];
  searchvalue;
  key = 'ngaynhap'; // set default
  reverse = false;
  p = 1;
  subnhappt: Subscription;
  constructor(
    private nhapphutungService: NhapphutungService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.getNhappts();
  }
  OnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.subnhappt.unsubscribe();
  }
  getNhappts() {
    this.subnhappt = this.nhapphutungService.getNhapphutungs().subscribe(res => {
      return this.nhapptList = res.map(item => {
        return {
          idnhappt: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Nhapphutung;
      });
    });
  }
  onDelete(id: string) {
    if (confirm('Are you sure ?')) {
      this.nhapphutungService.DeleteUlt(id)
        .then(() => {
          this.toastr.success('Xóa thành công', 'Phiếu nhập PT');
        },
        reject => {
          this.toastr.warning('Bạn không có quyền', 'Thất bại');
        })
        .catch(err => {
          this.toastr.error(err, 'Đã xảy ra lỗi');
        });
    }
  }
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
}
