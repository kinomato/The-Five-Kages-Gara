import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PhutungService } from '../shared/phutung.service';
import { Phutung } from 'src/app/models/phutung.model';

@Component({
  selector: 'app-phutung-detail',
  templateUrl: './phutung-detail.component.html',
  styleUrls: ['./phutung-detail.component.css']
})
export class PhutungDetailComponent implements OnInit {
  phutung: Phutung;
  constructor(
    private phutungService: PhutungService,
    private location: Location,
    private activetedRoute: ActivatedRoute
    ) { }

  ngOnInit() {
  }
  onSave(form: NgForm) {
    /* const id = form.value.id; */
    const id = this.activetedRoute.snapshot.paramMap.get('id'); // id: string
    console.log(id);
    const data = Object.assign({}, form.value);
    /* delete data.id; */
    this.phutungService.Update(id, data);
  }
  getphutung() {
    const id = this.activetedRoute.snapshot.paramMap.get('id'); // id: string
    console.log(id);
    this.phutungService.getPhutung(id)
    .subscribe(res => {
      this.phutung = res.data() as Phutung;
    });
  }
  goBack() {
    this.location.back();
  }
}
