import { Component, OnInit } from '@angular/core';
import { KhachhangService } from '../shared/khachhang.service';
import { Khachhang } from 'src/app/models/khachhang.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-khachhang-new',
  templateUrl: './khachhang-new.component.html',
  styleUrls: ['./khachhang-new.component.css']
})
export class KhachhangNewComponent implements OnInit {
  khachhang: Khachhang;
  constructor(private khachhangService: KhachhangService) { }

  ngOnInit() {
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.khachhang = {
      idkhachhang: null,
      tenkhachhang: '',
      dienthoai: '',
      diachi: ''
    };
  }
  onSubmit(form: NgForm) {
    const data = form.value;
    this.khachhangService.Submit(data);
    this.resetForm(form);
  }

}
