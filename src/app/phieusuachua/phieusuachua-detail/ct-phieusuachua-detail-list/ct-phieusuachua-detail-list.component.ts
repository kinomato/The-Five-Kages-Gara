import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CTPhieusuachua } from 'src/app/models/ct-phieusuachua.model';
import { Phieutiepnhan } from 'src/app/models/phieutiepnhan.model';
import { Phutung } from 'src/app/models/phutung.model';
import { Tiencong } from 'src/app/models/tiencong.model';
import { PhieusuachuaService } from '../../../services/phieusuachua.service';
import { TiencongService } from 'src/app/services/tiencong.service';
import { PhutungService } from 'src/app/services/phutung.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-ct-phieusuachua-detail-list',
  templateUrl: './ct-phieusuachua-detail-list.component.html',
  styleUrls: ['./ct-phieusuachua-detail-list.component.css']
})
export class CtPhieusuachuaDetailListComponent implements OnInit {
  ctsuachuaList: CTPhieusuachua[] = [];
  /* ctsuachua: CTPhieusuachua; */
 /*  tiepnhantemp: any;
  phutungtemp: any;
  tiencongtemp: any;
  tiepnhanList: Phieutiepnhan[]; */
  deleteList: string[] = [];
  idphieutiepnhan: string;
  phutungList: Phutung[];
  tiencongList: Tiencong[];
  configpt;
  configtc;
  tongtien = 0;
  @Output() tinhtien = new EventEmitter<number>();
  constructor(
    private suachuaService: PhieusuachuaService,
    private tiencongService: TiencongService,
    private phutungService: PhutungService,
    private location: Location
  ) {
    this.configpt = {
      displayKey: 'tenphutung', // if objects array passed which key to be displayed defaults to description
      search: true, // true/false for the search functionlity defaults to false,
      height: 'auto', // height of the list so that if there are more no of items
      // it can show a scroll defaults to auto. With auto height scroll will never appear
      placeholder: 'Chọn Phụ tùng', // text to be displayed when no item is selected defaults to Select,
      customComparator: () => { }, // a custom function using which user wants
      // to sort the items. default is undefined and Array.sort() will be used in that case,
      limitTo: 10, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
      moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
      noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
      searchPlaceholder: 'Search', // label thats displayed in search input,
      searchOnKey: 'tenphutung' // key on which search should be performed this will be selective search.
      // if undefined this will be extensive search on all keys
    };
    this.configtc = {
      displayKey: 'tenloaitiencong', // if objects array passed which key to be displayed defaults to description
      search: true, // true/false for the search functionlity defaults to false,
      height: 'auto', // height of the list so that if there are more no of items
      // it can show a scroll defaults to auto. With auto height scroll will never appear
      placeholder: 'Chọn Tiền công', // text to be displayed when no item is selected defaults to Select,
      customComparator: () => { }, // a custom function using which user wants
      // to sort the items. default is undefined and Array.sort() will be used in that case,
      limitTo: 10, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
      moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
      noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
      searchPlaceholder: 'Search', // label thats displayed in search input,
      searchOnKey: 'tenloaitiencong' // key on which search should be performed this will be selective search.
      // if undefined this will be extensive search on all keys
    };
  }

  ngOnInit() {
    this.getPhutungs();
    this.getTiencongs();
  }
  onDelete(data: any) {
    if (confirm('Are you sure?')) {
      const index = this.ctsuachuaList.indexOf(data, 0);
      if (index > -1) {
        /* this.suachuaService.ctDelete(this.idphieutiepnhan, data.idctsuachua); */
        this.ctsuachuaList.splice(index, 1);
        this.deleteList.push(data.idctsuachua);
      } else {
        console.log('something gone wrong');
      }
    }
  }
  add() {
    const temp = new CTPhieusuachua('', '', null, 0, 0, null, 0);
    this.ctsuachuaList.push(temp);
  }
  getPhutungs() {
    this.phutungService.getPhutungs().subscribe(res => {
      return this.phutungList = res.map(item => {
        return {
          idphutung: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Phutung;
      });
    });
  }
  getTiencongs() {
    this.tiencongService.getTiencongs().subscribe(res => {
      return this.tiencongList = res.map(item => {
        return {
          idtiencong: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Tiencong;
      });
    });
  }
  calculate(ctsuachua: CTPhieusuachua) {
    const index = this.ctsuachuaList.indexOf(ctsuachua, 0);
    const sl = this.ctsuachuaList[index].soluong;
    const dongia = this.ctsuachuaList[index].dongia;
    const tiencong = this.ctsuachuaList[index].tiencong;
    if (tiencong === undefined || tiencong === null) {
      return this.ctsuachuaList[index].thanhtien = dongia * sl + 0;
    }
    this.ctsuachuaList[index].thanhtien = dongia * sl + +tiencong.muctiencong;
    this.tinhTongTien();
  }
  tinhTongTien() {
    let temptong = 0;
    this.ctsuachuaList.forEach(item => {
      temptong += item.thanhtien;
    });
    this.tongtien = temptong;
    this.tinhtien.emit(this.tongtien);
  }
  changePT(selecteditem1: CTPhieusuachua) {
    const index1 = this.ctsuachuaList.indexOf(selecteditem1, 0);
    const item = this.ctsuachuaList[index1];
    if (item.phutung === undefined || item.phutung === null) {
      /* this.ctsuachuaList[index1].phutung = {} as Phutung; */
      this.ctsuachuaList[index1].dongia = 0;
      this.calculate(selecteditem1);
    } else {
      /* this.ctsuachuaList[index1].phutung = JSON.parse(JSON.stringify(this.phutungtemp)); */ // deep cloning object
      console.log(item.phutung);
      item.dongia = + item.phutung.giaphutung;
      this.calculate(selecteditem1);
    }
  }
  show() {
    this.ctsuachuaList.forEach(item => {
      console.log(item);
      console.log(this.ctsuachuaList.indexOf(item));
    });
    console.log(this.ctsuachuaList.length);
  }
  onSubmit(id: string) {
    this.suachuaService.ctSubmit(id, this.ctsuachuaList);
    this.formReset();
  }
  onSave(id: string) {
    this.suachuaService.ctUpdate(id, this.ctsuachuaList, this.deleteList);
  }
  formReset() {
    const length = this.ctsuachuaList.length;
    this.ctsuachuaList.splice(0, length);
  }
  getCTphieusuachua(id: string) {
    this.idphieutiepnhan = id;
    this.suachuaService.getCTphieusuachuas(id).subscribe(array => {
      return this.ctsuachuaList = array.map(item => {
        return {
          idctsuachua: item.payload.doc.id,
          ...item.payload.doc.data()
        } as CTPhieusuachua;
      });
    });
  }
}
