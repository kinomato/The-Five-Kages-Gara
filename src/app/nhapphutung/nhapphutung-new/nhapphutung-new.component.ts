import { Component, OnInit, ViewChild} from '@angular/core';
import { Location } from '@angular/common';
import { CtNhapphutungListComponent } from './ct-nhapphutung-list/ct-nhapphutung-list.component';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { NhapphutungService } from 'src/app/services/nhapphutung.service';
import {Router} from "@angular/router"

@Component({
  selector: 'app-nhapphutung-new',
  templateUrl: './nhapphutung-new.component.html',
  styleUrls: ['./nhapphutung-new.component.css']
})
export class NhapphutungNewComponent implements OnInit {
  tongtien: number;
  currentdate: Date = new Date();
  model;
  @ViewChild(CtNhapphutungListComponent)
  mychild: CtNhapphutungListComponent;
  constructor(
    private toastr: ToastrService,
    private location: Location,
    private nhapphutungService: NhapphutungService,
    private route: Router
  ) { }

  ngOnInit() {
    this.getDate();
  }
  onSubmit(data: NgForm) {
    const temp = Object.assign({ tongtien: this.tongtien}, data.value);
    this.nhapphutungService.Submit(temp)
      .then(id => {
        this.mychild.onSubmit(id);
      })
      .finally(() => {
        this.toastr.success('Submited Succesful!', 'Nhập phụ tùng');
        this.route.navigate(['/nhapphutung']);
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
}
