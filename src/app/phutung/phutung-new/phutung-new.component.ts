import { Component, OnInit } from '@angular/core';
import { PhutungService } from '../../services/phutung.service';
import { Phutung } from 'src/app/models/phutung.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-phutung-new',
  templateUrl: './phutung-new.component.html',
  styleUrls: ['./phutung-new.component.css']
})
export class PhutungNewComponent implements OnInit {
  phutung: Phutung;
  tenphutung: '';
  giaphutung: '';
  isshow = true;
  constructor(
    private phutungService: PhutungService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.phutung = {
      idphutung: null,
      tenphutung: '',
      giaphutung: 1000,
      soluong: null,
      soluongconlai: null,
      phatsinh: null,
    };
  }
  onSubmit(form: NgForm) {
    this.isshow = false;
    const data = form.value;
    this.phutungService.Submit({ ...data, isdelete: false, soluong: 0, soluongconlai: 0, phatsinh: 0 })
      .then(() => {
        this.toastr.success('Thêm thành công', 'Phụ tùng');
        this.isshow = true;
        this.resetForm(form);
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
  checkSL() {
    if (this.phutung.giaphutung > 10000000) {
      this.phutung.giaphutung = 10000000;
      return;
    }
    if (this.phutung.giaphutung < 1000) {
      return this.phutung.giaphutung = 1000;
    }
  }
}
