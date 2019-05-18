import { Component, OnInit } from '@angular/core';
import { KhachhangService } from '../../services/khachhang.service';
import { Khachhang } from 'src/app/models/khachhang.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-khachhang-new',
  templateUrl: './khachhang-new.component.html',
  styleUrls: ['./khachhang-new.component.css']
})
export class KhachhangNewComponent implements OnInit {
  khachhang: Khachhang;
  isshow = true;
  constructor(
    private khachhangService: KhachhangService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.khachhang = {
      idkhachhang: null,
      tenkhachhang: '',
      dienthoai: '',
      diachi: ''
    };
  }
  onSubmit(form: NgForm) {
    const data = Object.assign({ isdelete: false }, form.value);
    this.khachhangService.Submit(data)
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

}
