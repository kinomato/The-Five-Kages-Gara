import { Component, OnInit } from '@angular/core';
import { HieuxeService } from '../shared/hieuxe.service';
import { NgForm } from '@angular/forms';
import { Hieuxe } from 'src/app/models/hieuxe.model';

@Component({
  selector: 'app-hieuxe-new',
  templateUrl: './hieuxe-new.component.html',
  styleUrls: ['./hieuxe-new.component.css']
})
export class HieuxeNewComponent implements OnInit {

  hieuxe: Hieuxe = this.hieuxeService.hieuxe;
  constructor(
    private hieuxeService: HieuxeService
    ) { }

  ngOnInit() {
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.hieuxe = {
      idhieuxe: null,
      hieuxe: ''
    };
  }
  onSubmit(form: NgForm) {
    const data = form.value;
    this.hieuxeService.Submit(data);
    this.resetForm(form);
  }
}
