import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PhieutiepnhanService } from 'src/app/services/phieutiepnhan.service';
import { PhieuthutienService } from '../../services/phieuthutien.service';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Phieuthutien } from 'src/app/models/phieuthutien.model';
import { ActivatedRoute } from '@angular/router';
import { Phieutiepnhan } from 'src/app/models/phieutiepnhan.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-phieuthutien-detail',
  templateUrl: './phieuthutien-detail.component.html',
  styleUrls: ['./phieuthutien-detail.component.css']
})
export class PhieuthutienDetailComponent implements OnInit {
  bienso = '';
  tenchuxe = '';
  dienthoai = '';
  diachi = '';
  sotienthu = '';
  currentdate: Date = new Date();
  tiepnhantemp: any;
  tiepnhanList = [{bienso: 'None'}];
  model;
  config;
  isshow = true;
  subtiepnhan: Subscription;
  subthutien: Subscription;
  constructor(
    private toastr: ToastrService,
    private tiepnhanService: PhieutiepnhanService,
    private location: Location,
    private thutienService: PhieuthutienService,
    private activetedRoute: ActivatedRoute,
  ) {
    this.config = {
      displayKey: 'bienso', // if objects array passed which key to be displayed defaults to description
      search: true, // true/false for the search functionlity defaults to false,
      height: 'auto', // height of the list so that if there are more no of items
      // it can show a scroll defaults to auto. With auto height scroll will never appear
      placeholder: 'Biển số', // text to be displayed when no item is selected defaults to Select,
      customComparator: () => { }, // a custom function using which user wants
      // to sort the items. default is undefined and Array.sort() will be used in that case,
      limitTo: 10, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
      moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
      noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
      searchPlaceholder: 'Search', // label thats displayed in search input,
      searchOnKey: 'bienso' // key on which search should be performed this will be selective search.
      // if undefined this will be extensive search on all keys
    };
   }

  ngOnInit() {
    this.getPhieutiepnhans();
    this.getPhieuthutien();
  }
  OnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subthutien.unsubscribe();
    this.subtiepnhan.unsubscribe();
  }
  async getPhieutiepnhans() {
    this.subtiepnhan = this.thutienService.getPhieutiepnhans().subscribe(res => {
      this.tiepnhanList = [...this.tiepnhanList, res];
    },
      err => console.log(err));
  }
  getPhieuthutien() {
    const id = this.activetedRoute.snapshot.paramMap.get('id');
    this.subthutien = this.thutienService.getPhieuthutien(id).subscribe((data: Phieuthutien) => {
      const newobj = Object.assign({}, data);
      console.log(newobj);
      this.diachi = newobj.diachi;
      this.dienthoai = newobj.dienthoai;
      this.tenchuxe = newobj.tenchuxe;
      this.sotienthu = '' + newobj.sotienthu;
      this.model = newobj.ngaythutien;
      this.initialize(newobj.bienso);
    });
  }
  initialize(bienso: string) {
    this.thutienService.getPhieutiepnhan(bienso).subscribe(actionArray => {
      return actionArray.map(item => {
        return this.tiepnhantemp = Object.assign({}, {
          idphieutiepnhan: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Phieutiepnhan);
      });
    });
  }
  onSubmit(form: NgForm) {
    this.isshow = false;
    const id = this.activetedRoute.snapshot.paramMap.get('id');
    const newObj = Object.assign({ hieuxe: this.tiepnhantemp.hieuxe, sotienthu: +this.sotienthu } as Phieuthutien, form.value);
    newObj.bienso = this.tiepnhantemp.bienso;
    this.thutienService.Update(id, newObj)
      .then(() => {
        this.toastr.success('Cập nhật thành công', 'Phiếu sửa chữa');
        this.isshow = true;
      },
      reject => {
        this.toastr.warning('Bạn không đủ quyền', 'Thất bại');
        this.isshow = true;
      })
      .catch(err => {
        this.toastr.error('Bạn không đủ quyền', 'Thất bại');
        this.isshow = true;
      });
      /* .then(id => {
        this.thutienService.changePhieutiepnhan(id, this.tiepnhantemp, +this.sotienthu);
      })
      .finally(() => {
        this.toastr.success('Submited Succesful!', 'Phiếu sửa chữa');
      }); */
  }
  change() {
    if (this.tiepnhantemp === undefined || this.tiepnhantemp === null) {
      this.bienso = '';
      this.tenchuxe = '';
      this.diachi = '';
      this.dienthoai = '';
      this.sotienthu = '';
    } else {
      this.bienso = this.tiepnhantemp.bienso;
      this.tenchuxe = this.tiepnhantemp.tenkhachhang;
      this.diachi = this.tiepnhantemp.diachi;
      this.dienthoai = this.tiepnhantemp.dienthoai;
      this.sotienthu = this.tiepnhantemp.tienno;
    }
  }
  goBack() {
    this.location.back();
  }
  show() {
    /* this.tiepnhanList.forEach(item => {
      console.log(item);
    }); */
    console.log(this.tiepnhantemp);
  }
}
