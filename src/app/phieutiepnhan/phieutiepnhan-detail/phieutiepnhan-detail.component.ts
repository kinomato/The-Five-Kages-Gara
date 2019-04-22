import { Component, OnInit } from '@angular/core';
import { PhieutiepnhanService } from '../shared/phieutiepnhan.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Phieutiepnhan } from 'src/app/models/phieutiepnhan.model';
import { Hieuxe } from 'src/app/models/hieuxe.model';
import { NgForm } from '@angular/forms';
import { HieuxeService } from 'src/app/hieuxe/shared/hieuxe.service';
import {FormControl} from '@angular/forms';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-phieutiepnhan-detail',
  templateUrl: './phieutiepnhan-detail.component.html',
  styleUrls: ['./phieutiepnhan-detail.component.css']
})
export class PhieutiepnhanDetailComponent implements OnInit {
  phieutiepnhan: any;
  hieuxeList: Hieuxe[];
  hieuxeFilter: any;
  filteredOptions: any;
  constructor(
    private tiepnhanService: PhieutiepnhanService,
    private location: Location,
    private activetedRoute: ActivatedRoute,
    private hieuxeService: HieuxeService,
    private fireStore: AngularFirestore,
  ) { }

  ngOnInit() {
    this.getHieuxes();
    this.getThongtin();
  }
  search() {
    /* this.hieuxeFilter = this.hieuxeList.filter(hieuxe => {
      hieuxe.hieuxe.toLowerCase().includes(this.phieutiepnhan.hieuxe);
    }) */
    this.filteredOptions = this.fireStore.collection('tiepnhan', ref => ref
      .orderBy
    })
  }
  getThongtin() {
    const id = this.activetedRoute.snapshot.paramMap.get('id');
    this.tiepnhanService.getThongtin(id).subscribe(
      result => {
        console.log(result);
        this.phieutiepnhan = Object.assign({}, result);
      },
      err => console.log(err));
  }
  onSave(form: NgForm) {
    /* const id = form.value.id; */
    const id = this.activetedRoute.snapshot.paramMap.get('id'); // id: string
    console.log(id);
    const data = Object.assign({}, form.value);
    /* delete data.id; */
    this.hieuxeService.Update(id, data);
  }
  getHieuxes() {
    this.hieuxeService.getHieuXes().subscribe(actionArray => {
      this.hieuxeList = actionArray.map(item => {
        return {
          idhieuxe: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Hieuxe;
      });
    });
  }
  goBack() {
    this.location.back();
  }
}
