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
  hieuxe: Hieuxe = { hieuxe: '' };
  oldhieuxe: string;
  isshow = true;
  subhieuxe: Subscription;
  xe: Hieuxe;
  isshow1 = false;
  isshow2 = false;
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
    this.isshow = false;
    /* const id = form.value.id; */
    const id = this.activetedRoute.snapshot.paramMap.get('id'); // id: string
    const data = Object.assign({}, form.value) as Hieuxe;
    /* delete data.id; */
    this.subhieuxe = this.hieuxeService.Update(id, this.oldhieuxe, data).subscribe(res => {
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
        this.oldhieuxe = this.hieuxe.hieuxe;
      });
  }
  goBack() {
    this.location.back();
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
}
