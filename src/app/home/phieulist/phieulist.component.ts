import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { mergeMap, flatMap, map, switchMap } from 'rxjs/operators';
import { observable, forkJoin, Observable, combineLatest } from 'rxjs';
import { Phieufilter } from 'src/app/interfaces/phieufilter';

@Component({
  selector: 'app-phieulist',
  templateUrl: './phieulist.component.html',
  styleUrls: ['./phieulist.component.css']
})
export class PhieulistComponent implements OnInit {
  currentdate = new Date();
  today = this.currentdate.getDate() || false;
  usemonth = false;
  month: number = null;
  p = 1;
  searchvalue: string;
  /* week = this.currentdate.get */ // jesus
  phieufilter$: Observable<Phieufilter[]>;

  constructor(
    private homeService: HomeService
  ) { }

  ngOnInit() {
    this.getThongtin();
  }
  show() {
    if ( this.phieufilter$) {
      console.log('true');
    } else {
      console.log('false');
    }
  }
  switchvalue() {
    this.usemonth = true;
    this.phieufilter$ = null;
  }
  whyjesus() {
    this.usemonth = false;
    this.phieufilter$ = null;
  }
  getThongtin() {
    const tiepnhan$ = this.homeService.getPhieutiepnhan(this.today, this.usemonth);
    const suachua$ = this.homeService.getPhieusuachua(this.today, this.usemonth);
    const thutien$ = this.homeService.getPhieuthutien(this.today, this.usemonth);
    this.phieufilter$ = combineLatest(tiepnhan$, suachua$, thutien$).pipe(
      map((res) => {
        return [...res[0], ...res[1], ...res[2]];
      })
    );
  }
  valuechange() {
    this.phieufilter$ = null;
    this.getThongtin();
  }
}
