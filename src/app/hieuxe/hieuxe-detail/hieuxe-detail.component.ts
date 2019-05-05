import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Hieuxe } from 'src/app/models/hieuxe.model';
import { HieuxeService } from '../../services/hieuxe.service';

@Component({
  selector: 'app-hieuxe-detail',
  templateUrl: './hieuxe-detail.component.html',
  styleUrls: ['./hieuxe-detail.component.css']
})
export class HieuxeDetailComponent implements OnInit {
  hieuXe: Hieuxe;
  constructor(
    private hieuxeService: HieuxeService,
    private location: Location,
    private activetedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.gethieuxe();
  }
  onSave(form: NgForm) {
    /* const id = form.value.id; */
    const id = this.activetedRoute.snapshot.paramMap.get('id'); // id: string
    console.log(id);
    const data = Object.assign({}, form.value);
    /* delete data.id; */
    this.hieuxeService.Update(id, data);
  }
  gethieuxe() {
    const id = this.activetedRoute.snapshot.paramMap.get('id'); // id: string
    console.log(id);
    this.hieuxeService.getHieuxe(id)
    .subscribe(res => {
      this.hieuXe = res.data() as Hieuxe;
    });
  }
  goBack() {
    this.location.back();
  }
}
