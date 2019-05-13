import { Component, OnInit } from '@angular/core';
import { PhutungService } from '../../services/phutung.service';
import { Phutung } from 'src/app/models/phutung.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-phutung-new',
  templateUrl: './phutung-new.component.html',
  styleUrls: ['./phutung-new.component.css']
})
export class PhutungNewComponent implements OnInit {
  phutung: Phutung;
  tenphutung: '';
  giaphutung: '';
  constructor(private phutungService: PhutungService) { }

  ngOnInit() {
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.phutung = {
      idphutung: null,
      tenphutung: '',
      giaphutung: '',
      soluong: null,
      soluongconlai: null,
      phatsinh: null,
    };
  }
  onSubmit(form: NgForm) {
    const data = form.value;
    this.phutungService.Submit({...data, soluong: 0, soluongconlai: 0, phatsinh: 0});
    this.resetForm(form);
  }

}
