import { Component, OnInit } from '@angular/core';
import { PhieutiepnhanService } from '../../services/phieutiepnhan.service';
import { HieuxeService } from 'src/app/services/hieuxe.service';
import { XesuaService } from 'src/app/xesua/shared/xesua.service';
import { KhachhangService } from 'src/app/services/khachhang.service';
import { Phieutiepnhan } from 'src/app/models/phieutiepnhan.model';
import { Hieuxe } from 'src/app/models/hieuxe.model';
import { Xesua } from 'src/app/models/xesua.model';
import { Khachhang } from 'src/app/models/khachhang.model';
import { Observable, throwError } from 'rxjs';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { CustomResObject } from 'src/app/interfaces/custom-res-object';

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
  hieuxeList: Hieuxe[];
  currentdate: Date = new Date();
  model;
  temp = [];
  isshow = true;

  constructor(
    private tiepnhanService: PhieutiepnhanService,
    private hieuxeService: HieuxeService,
    private toastr: ToastrService,
    private location: Location,
  ) {
  }

  ngOnInit() {
    this.getHieuxes();
    this.getDate();
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
  /* getHieuxes() {
    this.hieuxeService.getHieuxes().subscribe(res => {
      this.hieuxeList = res.documents.map((item: CustomResObject) => {
        const id = item.name.split('/');
        return {
          idhieuxe: id[6],
          hieuxe: item.fields.hieuxe.stringValue
        } as Hieuxe;
      });
    });
  } */
  onSubmit(form: NgForm) {
    this.isshow = false;
    this.tiepnhanService.Submit(form).subscribe(res => {
      res.then(booleen => {
        if (booleen) {
          this.isshow = true;
          this.formReset(form);
        } else {
          this.isshow = true;
        }
      });
    });
    /* setTimeout(() => {
      this.isshow = true;
    }, 3500); */
  }
  getDate() {
    const day = this.currentdate.getDate();
    const month = this.currentdate.getMonth() + 1;
    const year = this.currentdate.getFullYear();
    this.model = {
      year,
      month,
      day
    };
  }
  formReset(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
  }
  goBack() {
    this.location.back();
  }
  show() {
    this.temp.forEach(element => {
      console.log(element);
    });
  }
}
