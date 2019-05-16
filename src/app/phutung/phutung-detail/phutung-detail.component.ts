import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PhutungService } from '../../services/phutung.service';
import { Phutung } from 'src/app/models/phutung.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-phutung-detail',
  templateUrl: './phutung-detail.component.html',
  styleUrls: ['./phutung-detail.component.css']
})
export class PhutungDetailComponent implements OnInit {
  phutung: Phutung = {
    idphutung: '',
    tenphutung: '',
    giaphutung: 0,
    soluong: 0,
    soluongconlai: 0,
    phatsinh: 0
  };
  isshow = true;
  constructor(
    private phutungService: PhutungService,
    private location: Location,
    private activetedRoute: ActivatedRoute,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
    this.getphutung();
  }
  onSave(form: NgForm) {
    this.isshow = false;
    /* const id = form.value.id; */
    const id = this.activetedRoute.snapshot.paramMap.get('id'); // id: string
   /*  console.log(id); */
    const data = Object.assign({}, form.value);
    /* delete data.id; */
    this.phutungService.Update(id, data)
    .then(() => {
      this.toastr.success('Thêm thành công', 'Phụ tùng');
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
  getphutung() {
    const id = this.activetedRoute.snapshot.paramMap.get('id'); // id: string
    console.log(id);
    this.phutungService.getPhutung(id)
    .subscribe(res => {
      this.phutung = res.data() as Phutung;
    });
  }
  goBack() {
    this.location.back();
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
