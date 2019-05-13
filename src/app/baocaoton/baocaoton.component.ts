import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-baocaoton',
  templateUrl: './baocaoton.component.html',
  styleUrls: ['./baocaoton.component.css']
})
export class BaocaotonComponent implements OnInit {
  soluong: number;
  currentdate: Date = new Date();

  constructor() { }

  ngOnInit() {
    this.getMonth();
  }
  getMonth() {
    this.soluong = this.currentdate.getMonth() + 1;
  }
  checkSL() {
    const min = 1;
    const max = 12;
    if (this.soluong < 1) {
      this.soluong = min;
      return;
    }
    if (this.soluong > 12) {
      this.soluong = max;
      return;
    }
  }
}
