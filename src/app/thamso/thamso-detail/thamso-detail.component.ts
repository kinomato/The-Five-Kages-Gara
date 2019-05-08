import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ThamsoService } from '../../services/thamso.service';
import { Thamso } from 'src/app/models/thamso.model';

@Component({
  selector: 'app-thamso-detail',
  templateUrl: './thamso-detail.component.html',
  styleUrls: ['./thamso-detail.component.css']
})
export class ThamsoDetailComponent implements OnInit {
  thamso: Thamso;
  constructor(
    private thamsoService: ThamsoService,
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
    this.thamsoService.Update(id, data);
  }
  getthamso() {
    const id = this.activetedRoute.snapshot.paramMap.get('id'); // id: string
    console.log(id);
    this.thamsoService.getThamso(id)
    .subscribe(res => {
      this.thamso = res.data() as Thamso;
    });
  }
  goBack() {
    this.location.back();
  }
}
