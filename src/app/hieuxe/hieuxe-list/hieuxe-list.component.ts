import { Component, OnInit } from '@angular/core';
import { HieuxeService } from '../../services/hieuxe.service';
import { Hieuxe } from 'src/app/models/hieuxe.model';

@Component({
  selector: 'app-hieuxe-list',
  templateUrl: './hieuxe-list.component.html',
  styleUrls: ['./hieuxe-list.component.css']
})
export class HieuxeListComponent implements OnInit {

  hieuxeList: Hieuxe[];
  constructor(private hieuxeService: HieuxeService) { }

  ngOnInit() {
    this.getHieuxes();
  }
  getHieuxes() {
    this.hieuxeService.getHieuXes().subscribe(actionArray => {
      this.hieuxeList = actionArray.map(item => {
        /* console.log('im still running too'); */
        return {
          idhieuxe: item.payload.doc.id,
          ...item.payload.doc.data() } as Hieuxe;
      });
    });
  }
  onDelete(id: string) {
    if (confirm('are you sure ?')) {
      this.hieuxeService.Delete(id);
    }
  }
}
