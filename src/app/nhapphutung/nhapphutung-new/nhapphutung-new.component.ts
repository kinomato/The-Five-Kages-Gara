import { Component, OnInit, ViewChild} from '@angular/core';
import { Location } from '@angular/common';
import { CtNhapphutungListComponent } from './ct-nhapphutung-list/ct-nhapphutung-list.component';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { NhapphutungService } from 'src/app/services/nhapphutung.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nhapphutung-new',
  templateUrl: './nhapphutung-new.component.html',
  styleUrls: ['./nhapphutung-new.component.css']
})
export class NhapphutungNewComponent implements OnInit {
  tongtien: number;
  currentdate: Date = new Date();
  model;
  isshow = true;
  invalid = true;
  @ViewChild(CtNhapphutungListComponent)
  mychild: CtNhapphutungListComponent;
  constructor(
    private toastr: ToastrService,
    private location: Location,
    private nhapphutungService: NhapphutungService,
    private route: Router
  ) { }

  ngOnInit() {
    this.getDate();
  }
  onSubmit(data: NgForm) {
    this.isshow = false;
    const temp = Object.assign({ tongtien: this.tongtien}, data.value);
    const ctdata = this.mychild.ctphutungList;
    this.nhapphutungService.SubmitUlt(temp, ctdata)
      .then(() => {
        this.toastr.success('Thành công', 'Nhập phụ tùng');
        this.route.navigate(['/nhapphutung']);
      },
      reject => {
        this.toastr.warning('Bạn không có quyền', 'Thất bại');
        this.isshow = true;
      })
      .catch(err => {
        this.toastr.error(err, 'Đã xảy ra lỗi');
      });
  }
  getDate() {
    const day = this.currentdate.getDate();
    const month = this.currentdate.getMonth() + 1;
    const year = this.currentdate.getFullYear();
    this.model = {
      year,
      month,
      day
    };
  }
  tinhTien(event: any) {
    if (event === null) {
      this.invalid = true;
    } else {
      this.invalid = false;
    }
  }
  goBack() {
    this.location.back();
  }
}
