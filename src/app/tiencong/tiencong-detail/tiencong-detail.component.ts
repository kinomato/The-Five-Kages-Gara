import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TiencongService } from '../../services/tiencong.service';
import { Tiencong } from 'src/app/models/tiencong.model';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tiencong-detail',
  templateUrl: './tiencong-detail.component.html',
  styleUrls: ['./tiencong-detail.component.css']
})
export class TiencongDetailComponent implements OnInit {
  tiencong: Tiencong;
  isshow = true;
  subtiencong: Subscription;
  constructor(
    private tiencongService: TiencongService,
    private location: Location,
    private activetedRoute: ActivatedRoute,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
    this.gettiencong();
  }
  OnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.subtiencong.unsubscribe();
  }
  onSave(form: NgForm) {
    this.isshow = false;
    /* const id = form.value.id; */
    const id = this.activetedRoute.snapshot.paramMap.get('id'); // id: string
    console.log(id);
    const data = Object.assign({}, form.value);
    /* delete data.id; */
    this.tiencongService.Update(id, data)
    .then(() => {
      this.toastr.success('Thêm thành công', 'Tiền công');
      this.isshow = true;
      this.goBack();
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
  gettiencong() {
    const id = this.activetedRoute.snapshot.paramMap.get('id'); // id: string
    this.subtiencong = this.tiencongService.getTiencong(id)
    .subscribe(res => {
      this.tiencong = res.data() as Tiencong;
    });
  }
  goBack() {
    this.location.back();
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
