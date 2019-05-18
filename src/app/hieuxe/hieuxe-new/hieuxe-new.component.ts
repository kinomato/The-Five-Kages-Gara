import { Component, OnInit } from '@angular/core';
import { HieuxeService } from '../../services/hieuxe.service';
import { NgForm } from '@angular/forms';
import { Hieuxe } from 'src/app/models/hieuxe.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-hieuxe-new',
  templateUrl: './hieuxe-new.component.html',
  styleUrls: ['./hieuxe-new.component.css']
})
export class HieuxeNewComponent implements OnInit {
  hieuxe: Hieuxe;
  isshow = true;
  constructor(
    private hieuxeService: HieuxeService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.hieuxe = {
      idhieuxe: null,
      hieuxe: ''
    };
  }
  onSubmit(form: NgForm) {
    const data = Object.assign({ isdelete: false }, form.value);
    this.hieuxeService.Submit(data)
      .then(() => {
        this.toastr.success('Thêm thành công', 'Hiệu xe');
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
