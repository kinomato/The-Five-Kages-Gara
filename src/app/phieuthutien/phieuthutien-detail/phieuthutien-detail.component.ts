import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PhieutiepnhanService } from 'src/app/phieutiepnhan/shared/phieutiepnhan.service';
import { PhieuthutienService } from '../shared/phieuthutien.service';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Phieuthutien } from 'src/app/models/phieuthutien.model';

@Component({
  selector: 'app-phieuthutien-detail',
  templateUrl: './phieuthutien-detail.component.html',
  styleUrls: ['./phieuthutien-detail.component.css']
})
export class PhieuthutienDetailComponent implements OnInit {
  bienso: '';
  tenchuxe: '';
  dienthoai: '';
  diachi: '';
  sotienthu: '';
  currentdate: Date = new Date();
  tiepnhantemp: any;
  tiepnhanList = [{bienso: 'None'}];
  model;
  config;
  ishow = false;
  constructor(
    private toastr: ToastrService,
    private tiepnhanService: PhieutiepnhanService,
    private location: Location,
    private thutienService: PhieuthutienService
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
  }
  async getPhieutiepnhans() {
    this.thutienService.getPhieutiepnhans().subscribe(res => {
      this.tiepnhanList = [...this.tiepnhanList, res];
    },
      err => console.log(err));
  }
  onSubmit(form: NgForm) {
    const newObj = Object.assign({ sotienthu: +this.sotienthu } as Phieuthutien, form.value);
    newObj.bienso = this.tiepnhantemp.bienso;
    this.thutienService.Submit(newObj)
      .then(id => {
        this.thutienService.changePhieutiepnhan(id, this.tiepnhantemp, +this.sotienthu);
      })
      .finally(() => {
        this.toastr.success('Submited Succesful!', 'Phiếu sửa chữa');
      });
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
  show() {
    this.tiepnhanList.forEach(item => {
      console.log(item);
    });
  }
}
