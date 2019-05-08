import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Thamso } from 'src/app/models/thamso.model';
import { ThamsoService } from '../../services/thamso.service';

@Component({
  selector: 'app-thamso-new',
  templateUrl: './thamso-new.component.html',
  styleUrls: ['./thamso-new.component.css']
})
export class ThamsoNewComponent implements OnInit {
  thamso: Thamso;
  constructor(private thamsoService: ThamsoService) { }

  ngOnInit() {
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.thamso = {
      idthamso: null,
      tenthamso: '',
      giatri: ''
    };
  }
  onSubmit(form: NgForm) {
    const data = form.value;
    this.thamsoService.Submit(data);
    this.resetForm(form);
  }

}
