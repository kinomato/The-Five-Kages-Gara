import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Phieusuachua } from 'src/app/models/phieusuachua.model';
import { PhieusuachuaService } from '../../services/phieusuachua.service';
import { NgForm } from '@angular/forms';
import { CTPhieusuachuaListComponent } from './ct-phieusuachua-list/ct-phieusuachua-list.component';
import { ToastrService } from 'ngx-toastr';
import { Phieutiepnhan } from 'src/app/models/phieutiepnhan.model';
import { PhieutiepnhanService } from 'src/app/services/phieutiepnhan.service';

@Component({
  selector: 'app-phieusuachua-new',
  templateUrl: './phieusuachua-new.component.html',
  styleUrls: ['./phieusuachua-new.component.css']
})
export class PhieusuachuaNewComponent implements OnInit {
  phieusuachua: Phieusuachua;
  currentdate: Date = new Date();
  model;
  tiepnhantemp: any;
  tiepnhanList: Phieutiepnhan[];
  tongtien: number;
  config;
  @ViewChild(CTPhieusuachuaListComponent)
  mychild: CTPhieusuachuaListComponent;

  constructor(
    private toastr: ToastrService,
    private suachuaService: PhieusuachuaService,
    private tiepnhanService: PhieutiepnhanService,
    private location: Location
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
    this.formReset();
    this.getDate();
    this.getPhieutiepnhans();
  }
  onSubmit(data: NgForm) {
    const temp = Object.assign({ tongtien: this.tongtien}, data.value);
    temp.bienso = this.tiepnhantemp.bienso;
    console.log(temp);
    this.suachuaService.Submit(temp)
      .then(id => {
        this.mychild.onSubmit(id);
        this.suachuaService.changePhieutiepnhan(id, this.tiepnhantemp, temp.tongtien);
      })
      .finally(() => {
        this.toastr.success('Submited Succesful!', 'Phiếu sửa chữa');
        this.location.back();
      });
  }
  getDate() {
    const day = this.currentdate.getDate();
    const month = this.currentdate.getMonth();
    const year = this.currentdate.getFullYear();
    this.model = {
      year,
      month,
      day
    };
  }
  getPhieutiepnhans() {
    this.tiepnhanService.getTiepnhansps().subscribe(res => {
      return this.tiepnhanList = res.map(item => {
        return {
          idphieutiepnhan: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Phieutiepnhan;
      });
    });
  }
  formReset(form?: NgForm) {
    if (form) {
      form.resetForm();
    }
    /* this.getPhieutiepnhans(); */
    this.tiepnhantemp = undefined;
  }
  show() {
    console.log(this.tiepnhantemp);
  }
  change() {
    this.getPhieutiepnhans();
  }
}
