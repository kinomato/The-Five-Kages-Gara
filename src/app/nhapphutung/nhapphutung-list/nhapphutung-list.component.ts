import { Component, OnInit } from '@angular/core';
import { Nhapphutung } from 'src/app/models/nhapphutung.model';
import { NhapphutungService } from 'src/app/services/nhapphutung.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nhapphutung-list',
  templateUrl: './nhapphutung-list.component.html',
  styleUrls: ['./nhapphutung-list.component.css']
})
export class NhapphutungListComponent implements OnInit {
  nhapptList: Nhapphutung[] = [];
  constructor(
    private nhapphutungService: NhapphutungService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.getNhappts();
  }
  getNhappts() {
    this.nhapphutungService.getNhapphutungs().subscribe(res => {
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
          this.toastr.error('Bạn không có quyền', 'Thất bại');
        })
        .catch(err => console.log(err));
    }
  }
}
