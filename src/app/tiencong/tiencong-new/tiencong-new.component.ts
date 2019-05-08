import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Tiencong } from 'src/app/models/tiencong.model';
import { TiencongService } from '../../services/tiencong.service';

@Component({
  selector: 'app-tiencong-new',
  templateUrl: './tiencong-new.component.html',
  styleUrls: ['./tiencong-new.component.css']
})
export class TiencongNewComponent implements OnInit {
  tiencong: Tiencong;
  constructor(private tiencongService: TiencongService) { }

  ngOnInit() {
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.tiencong = {
      idtiencong: null,
      tenloaitiencong: '',
      muctiencong: ''
    };
  }
  onSubmit(form: NgForm) {
    const data = form.value;
    this.tiencongService.Submit(data);
    this.resetForm(form);
  }

}
