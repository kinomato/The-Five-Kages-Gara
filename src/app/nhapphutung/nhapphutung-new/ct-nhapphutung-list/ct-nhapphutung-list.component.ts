import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PhutungService } from 'src/app/services/phutung.service';
import { CTNhapphutung } from 'src/app/models/ct-nhapphutung.model';
import { Phutung } from 'src/app/models/phutung.model';
import { NhapphutungService } from 'src/app/services/nhapphutung.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ct-nhapphutung-list',
  templateUrl: './ct-nhapphutung-list.component.html',
  styleUrls: ['./ct-nhapphutung-list.component.css']
})
export class CtNhapphutungListComponent implements OnInit {
  ctphutungList = [];
  ptbooleanlist = [];
  selectedPTList = [];
  phutungList = [];
  tongtien = 0;
  subphutung: Subscription;
  @Output() tinhtien = new EventEmitter<number>();
  constructor(
    private phutungService: PhutungService,
    private nhapphutungService: NhapphutungService
  ) { }

  ngOnInit() {
    this.getPhutungs();
  }
  OnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.subphutung.unsubscribe();
  }
  onDelete(data: any) {
    const index = this.ctphutungList.indexOf(data, 0);
    if (index > -1) {
      this.ctphutungList.splice(index, 1);
      this.selectedPTList.splice(index, 1);
      this.updateStatusPT();
      this.tinhTongTien();
    } else {
      console.log('something gone wrong');
    }
  }
  add() {
    const newObj = new CTNhapphutung(undefined, 1, null, null);
    const temp = JSON.parse(JSON.stringify(newObj));
    this.ctphutungList.push(temp);
    this.tinhTongTien();
    /* this.onDelete(temp);
    this.ctphutungList.push(temp); */
  }
  getPhutungs() {
    this.subphutung = this.phutungService.getPhutungs().subscribe(res => {
      this.phutungList = res.map(item => {
        return {
          idphutung: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Phutung;
      });
      return this.updateStatusPT();
    });
  }
  calculate(ctphutung: CTNhapphutung) {
    const index = this.ctphutungList.indexOf(ctphutung, 0);
    const sl = this.ctphutungList[index].soluong;
    const dongia = this.ctphutungList[index].dongia;
    /* const tiencong = this.ctphutungList[index].tiencong;
    if (tiencong === undefined || tiencong === null) {
      this.ctphutungList[index].thanhtien = dongia * sl + 0;
      return this.tinhTongTien();
    } */
    this.ctphutungList[index].thanhtien = dongia * sl;
    this.tinhTongTien();
  }
  tinhTongTien() {
    let temptong = 0;
    const count = this.ctphutungList.length;
    for (let i = 0; i < count; i++) {
      if (this.ctphutungList[i].thanhtien === null) {
        temptong = null;
        break;
      }
      temptong += this.ctphutungList[i].thanhtien;
    }
    /* this.ctphutungList.forEach(item => {
      temptong += item.thanhtien;
    }); */
    this.tongtien = temptong;
    this.tinhtien.emit(this.tongtien);
  }
  changePT(selecteditem1: CTNhapphutung) {
    const index1 = this.ctphutungList.indexOf(selecteditem1, 0);
    const item = this.ctphutungList[index1];
    this.selectedPTList[index1] = item.phutung.tenphutung;
    this.updateStatusPT();
    if (item.phutung === undefined || item.phutung === null) {
      this.ctphutungList[index1].dongia = null;
      this.calculate(selecteditem1);
    } else {
      item.dongia = +item.phutung.giaphutung;
      this.calculate(selecteditem1);
    }
  }
  updateStatusPT() {
    let i = 0;
    this.phutungList.forEach(item => {
      const selected = this.selectedPTList.includes(item.tenphutung);
      this.ptbooleanlist[i] = selected;
      i ++;
    });
  }
  customComparePT(phutung1: Phutung, phutung2: Phutung) {
    return phutung1.idphutung === phutung2.idphutung;
  }
  checkSL(ctsuachua: CTNhapphutung) {
    if (ctsuachua.soluong > 200) {
      ctsuachua.soluong = 200;
    }
    if ( ctsuachua.soluong < 1 ) {
      ctsuachua.soluong = 1;
    }
    this.calculate(ctsuachua);
  }
}
