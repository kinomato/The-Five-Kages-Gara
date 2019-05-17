import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-baocaoton',
  templateUrl: './baocaoton.component.html',
  styleUrls: ['./baocaoton.component.css']
})
export class BaocaotonComponent implements OnInit {
  thang: number;
  currentdate: Date = new Date();

  constructor() { }

  ngOnInit() {
    this.getMonth();
  }
  getMonth() {
    this.thang = this.currentdate.getMonth() + 1;
  }
  checkSL() {
    const min = 1;
    const max = 12;
    if (this.thang < 1) {
      this.thang = min;
      return;
    }
    if (this.thang > 12) {
      this.thang = max;
      return;
    }
  }
}
