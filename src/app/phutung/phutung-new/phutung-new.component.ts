import { Component, OnInit } from '@angular/core';
import { PhutungService } from '../shared/phutung.service';
import { Phutung } from 'src/app/models/phutung.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-phutung-new',
  templateUrl: './phutung-new.component.html',
  styleUrls: ['./phutung-new.component.css']
})
export class PhutungNewComponent implements OnInit {
  phutung: Phutung;
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
      soluongconlai: null,
    };
  }
  onSubmit(form: NgForm) {
    const data = form.value;
    this.phutungService.Submit(data);
    this.resetForm(form);
  }

}
