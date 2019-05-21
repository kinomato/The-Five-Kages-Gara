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
  isshow1 = false;
  isshow2 = false;
  xe: Hieuxe;
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
  Search() {
    this.isshow1 = false;
    this.isshow2 = true;
    if (this.hieuxe.hieuxe.length > 2) {
      this.hieuxeService.Search(this.hieuxe.hieuxe).subscribe(res => {
        this.isshow2 = false;
        this.isshow1 = true;
        this.xe = res;
      });
    } else {
      this.isshow1 = false;
      this.isshow2 = false;
    }
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
