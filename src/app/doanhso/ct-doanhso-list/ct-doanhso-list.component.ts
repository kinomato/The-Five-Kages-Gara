import { Component, OnInit, ViewChild } from '@angular/core';
import { PhieuthutienService } from 'src/app/services/phieuthutien.service';
import { map, flatMap } from 'rxjs/operators';
import { HieuxeService } from 'src/app/services/hieuxe.service';
import { Hieuxe } from 'src/app/models/hieuxe.model';
import { Phieuthutien } from 'src/app/models/phieuthutien.model';
import { promise } from 'protractor';
import { stringify } from '@angular/core/src/render3/util';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { combineLatest, Subscription } from 'rxjs';

@Component({
  selector: 'app-ct-doanhso-list',
  templateUrl: './ct-doanhso-list.component.html',
  styleUrls: ['./ct-doanhso-list.component.css']
})
export class CtDoanhsoListComponent implements OnInit {
  newdata = [];
  currentdate = new Date();
  tongtien = 0;
  displayedColumns: string[] = ['hieuxe', 'luotsua', 'thanhtien', 'tile'];
  arr = [
    { hieuxe: 'toyota', luotsua: 2, thanhtien: 1452, tile: '12%' },
    { hieuxe: 'toyota', luotsua: 2, thanhtien: 1452, tile: '12%' },
    { hieuxe: 'toyota', luotsua: 2, thanhtien: 1452, tile: '12%' },
    { hieuxe: 'toyota', luotsua: 2, thanhtien: 1452, tile: '12%' },
    { hieuxe: 'toyota', luotsua: 2, thanhtien: 1452, tile: '12%' },
    { hieuxe: 'toyota', luotsua: 2, thanhtien: 1452, tile: '12%' },
    { hieuxe: 'toyota', luotsua: 2, thanhtien: 1452, tile: '12%' },
    { hieuxe: 'toyota', luotsua: 2, thanhtien: 1452, tile: '12%' },
  ];
  subthutien: Subscription;
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private thutienService: PhieuthutienService,
    private hieuxeService: HieuxeService
  ) { }

  ngOnInit() {
    /* this.getHieuxes();
    this.getThutiens(); */
    /* this.initialize(); */
    this.tinhToan();
  }
  OnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.subthutien.unsubscribe();
  }
  tinhToan() {
    this.subthutien = this.getThutiens1().subscribe(arr => {
      const arrtemp = arr;
      arrtemp.forEach(element => {
        element.tile = ((element.thanhtien / this.tongtien) * 100).toFixed(1) + '%';
      });
      this.dataSource = new MatTableDataSource(arrtemp);
      this.dataSource.paginator = this.paginator;
    });
  }
  getThutiens1() {
    const thang = this.currentdate.getMonth() + 1;
    return this.thutienService.getPhieuthutiensQuery('ngaythutien.month', thang).pipe(
      map(res => {
        return res.map(item => {
          return {
            idphieuthutien: item.payload.doc.id,
            ...item.payload.doc.data()
          } as Phieuthutien;
        });
      }),
      map(arr => {
        console.log('hehe' + arr);
        const temparr = [];
        arr.forEach(element => {
          this.tongtien += element.sotienthu;
          const index = temparr.indexOf(element.hieuxe, 0);
          if (index === -1) {
            const newobj = {
              hieuxe: element.hieuxe,
              luotsua: 1,
              thanhtien: element.sotienthu,
              tile: ''
            };
            temparr.push(newobj);
          } else {
            temparr[index].luotsua++;
            temparr[index].thanhtien += element.sotienthu;
          }
        });
        return temparr;
      }),
    );
  }
  show() {
    console.log(this.dataSource);
    console.log(this.newdata);
  }
}

