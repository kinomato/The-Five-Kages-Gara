import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { KhachhangService } from '../../services/khachhang.service';
import { Khachhang } from 'src/app/models/khachhang.model';

@Component({
  selector: 'app-khachhang-detail',
  templateUrl: './khachhang-detail.component.html',
  styleUrls: ['./khachhang-detail.component.css']
})
export class KhachhangDetailComponent implements OnInit {
  khachhang: Khachhang;
  constructor(
    private khachhangService: KhachhangService,
    private location: Location,
    private activetedRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    this.getkhachhang();
  }
  onSave(form: NgForm) {
    /* const id = form.value.id; */
    const id = this.activetedRoute.snapshot.paramMap.get('id'); // id: string
    console.log(id);
    const data = Object.assign({}, form.value);
    /* delete data.id; */
    this.khachhangService.Update(id, data);
  }
  getkhachhang() {
    const id = this.activetedRoute.snapshot.paramMap.get('id'); // id: string
    console.log(id);
    this.khachhangService.getKhachhang(id)
    .subscribe(res => {
      this.khachhang = res.data() as Khachhang;
    });
  }
  goBack() {
    this.location.back();
  }
}
