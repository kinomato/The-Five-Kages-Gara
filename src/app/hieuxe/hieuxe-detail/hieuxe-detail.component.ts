import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Hieuxe } from 'src/app/models/hieuxe.model';
import { HieuxeService } from '../../services/hieuxe.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hieuxe-detail',
  templateUrl: './hieuxe-detail.component.html',
  styleUrls: ['./hieuxe-detail.component.css']
})
export class HieuxeDetailComponent implements OnInit {
  hieuxe: Hieuxe;
  isshow = true;
  subhieuxe: Subscription;
  constructor(
    private hieuxeService: HieuxeService,
    private location: Location,
    private activetedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.gethieuxe();
  }
  OnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.subhieuxe.unsubscribe();
  }
  onSave(form: NgForm) {
    /* const id = form.value.id; */
    const id = this.activetedRoute.snapshot.paramMap.get('id'); // id: string
    const data = Object.assign({}, form.value) as Hieuxe;
    /* delete data.id; */
    this.subhieuxe = this.hieuxeService.Update(id, data).subscribe(res => {
      res.then(() => {
        this.toastr.success('Cập nhật thành công', 'Hiệu xe');
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
    });
  }
  gethieuxe() {
    const id = this.activetedRoute.snapshot.paramMap.get('id'); // id: string
    this.subhieuxe = this.hieuxeService.getHieuxe(id)
      .subscribe(res => {
        this.hieuxe = res.data() as Hieuxe;
      });
  }
  goBack() {
    this.location.back();
  }
}
