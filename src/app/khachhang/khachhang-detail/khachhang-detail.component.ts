import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { KhachhangService } from '../../services/khachhang.service';
import { Khachhang } from 'src/app/models/khachhang.model';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-khachhang-detail',
  templateUrl: './khachhang-detail.component.html',
  styleUrls: ['./khachhang-detail.component.css']
})
export class KhachhangDetailComponent implements OnInit {
  khachhang: Khachhang;
  isshow = true;
  subkhachhang: Subscription;
  constructor(
    private khachhangService: KhachhangService,
    private location: Location,
    private activetedRoute: ActivatedRoute,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
    this.getkhachhang();
  }
  OnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.subkhachhang.unsubscribe();
  }
  onSave(form: NgForm) {
    /* const id = form.value.id; */
    const id = this.activetedRoute.snapshot.paramMap.get('id'); // id: string
    /* console.log(id); */
    const data = Object.assign({}, form.value);
    /* delete data.id; */
    this.khachhangService.Update(id, data)
    .then(() => {
      this.toastr.success('Cập nhật thành công', 'Khách hàng');
      this.isshow = true;
      this.goBack();
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
  getkhachhang() {
    const id = this.activetedRoute.snapshot.paramMap.get('id'); // id: string
    this.subkhachhang = this.khachhangService.getKhachhang(id)
    .subscribe(res => {
      this.khachhang = res.data() as Khachhang;
    });
  }
  goBack() {
    this.location.back();
  }
}
