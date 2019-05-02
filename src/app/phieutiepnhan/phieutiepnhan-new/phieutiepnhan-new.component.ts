import { Component, OnInit } from '@angular/core';
import { PhieutiepnhanService } from '../shared/phieutiepnhan.service';
import { HieuxeService } from 'src/app/hieuxe/shared/hieuxe.service';
import { XesuaService } from 'src/app/xesua/shared/xesua.service';
import { KhachhangService } from 'src/app/khachhang/shared/khachhang.service';
import { Phieutiepnhan } from 'src/app/models/phieutiepnhan.model';
import { Hieuxe } from 'src/app/models/hieuxe.model';
import { Xesua } from 'src/app/models/xesua.model';
import { Khachhang } from 'src/app/models/khachhang.model';
import { Observable, throwError } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-phieutiepnhan-new',
  templateUrl: './phieutiepnhan-new.component.html',
  styleUrls: ['./phieutiepnhan-new.component.css']
})
export class PhieutiepnhanNewComponent implements OnInit {
  tenkhachhang: '';
  biensoxe: '';
  sodienthoai: '';
  diachikhach: '';
  tenhieuxe: string = null;
  selectedHieuxe: Observable<Hieuxe> = null;
  tiepnhan: Phieutiepnhan;
  hieuxe: Hieuxe;
  xesua: Xesua;
  khachhang: Khachhang;
  hieuxeList: Hieuxe[];
  currentdate: Date = new Date();
  khachhangList: Khachhang[];

  constructor(
    private tiepnhanService: PhieutiepnhanService,
    private hieuxeService: HieuxeService,
    private xesuaService: XesuaService,
    private khachhangService: KhachhangService,
    private toastr: ToastrService,
    private location: Location,
  ) {
  }

  ngOnInit() {
    this.getHieuxes();
    this.formReset();
  }
  getHieuxes() {
    this.hieuxeService.getHieuXes().subscribe(actionArray => {
      this.hieuxeList = actionArray.map(item => {
        return {
          idhieuxe: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Hieuxe;
      });
    });
  }
  onSubmit(form: NgForm) {
    this.tiepnhanService.Submit(form);
    this.toastr.success('Submitted Succesfully!', 'Tiếp nhận xe');
    this.formReset(form);
  }
  formReset(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    /* this.tenkhachhang = '';
    this.diachikhach = '';
    this.sodienthoai = '';
    this.biensoxe = '';
    this.khachhang = {
      idkhachhang: '',
      tenkhachhang: '',
      dienthoai: '',
      diachi: ''
    };
    this.hieuxe = {
      idhieuxe: '',
      hieuxe: ''
    };
    this.xesua = {
      idxesua: null,
      idhieuxe: '',
      idkhachhang: '',
      bienso: ''
    }; */
  }
  goBack() {
    this.location.back();
  }
}
