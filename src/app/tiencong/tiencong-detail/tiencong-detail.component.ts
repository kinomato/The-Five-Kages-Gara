import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TiencongService } from '../shared/tiencong.service';
import { Tiencong } from 'src/app/models/tiencong.model';

@Component({
  selector: 'app-tiencong-detail',
  templateUrl: './tiencong-detail.component.html',
  styleUrls: ['./tiencong-detail.component.css']
})
export class TiencongDetailComponent implements OnInit {
  tiencong: Tiencong;
  constructor(
    private tiencongService: TiencongService,
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
    this.tiencongService.Update(id, data);
  }
  gettiencong() {
    const id = this.activetedRoute.snapshot.paramMap.get('id'); // id: string
    console.log(id);
    this.tiencongService.getTiencong(id)
    .subscribe(res => {
      this.tiencong = res.data() as Tiencong;
    });
  }
  goBack() {
    this.location.back();
  }
}
