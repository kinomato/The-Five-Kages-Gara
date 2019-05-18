import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Tiencong } from 'src/app/models/tiencong.model';
import { TiencongService } from '../../services/tiencong.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tiencong-new',
  templateUrl: './tiencong-new.component.html',
  styleUrls: ['./tiencong-new.component.css']
})
export class TiencongNewComponent implements OnInit {
  tiencong: Tiencong;
  isshow = true;
  constructor(
    private tiencongService: TiencongService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.tiencong = {
      idtiencong: null,
      tenloaitiencong: '',
      muctiencong: null,
    };
  }
  onSubmit(form: NgForm) {
    this.isshow = false;
    const data = Object.assign({isdelete: false}, form.value);
    this.tiencongService.Submit(data)
      .then(() => {
        this.toastr.success('Thêm thành công', 'Tiền công');
        this.isshow = true;
        this.resetForm(form);
      },
      reject => {
        this.toastr.warning('Bạn không đủ quyền', 'Thất bại');
        this.isshow = true;
      })
      .catch(err => {
        this.toastr.error(err, 'Đã xảy ra lỗi');
        this.isshow = true;
      });
  }
  checkSL() {
    if (this.tiencong.muctiencong > 10000000) {
      this.tiencong.muctiencong = 10000000;
      return;
    }
    if (this.tiencong.muctiencong < 1000) {
      return this.tiencong.muctiencong = 1000;
    }
  }
}
