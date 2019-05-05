import { Component, OnInit } from '@angular/core';
import { PhieusuachuaService } from '../../services/phieusuachua.service';
import { Phieusuachua } from 'src/app/models/phieusuachua.model';

@Component({
  selector: 'app-phieusuachua-list',
  templateUrl: './phieusuachua-list.component.html',
  styleUrls: ['./phieusuachua-list.component.css']
})
export class PhieusuachuaListComponent implements OnInit {
  suachuaList: Phieusuachua[];

  constructor(
    private suachuaService: PhieusuachuaService,
    ) { }

  ngOnInit() {
    this.getSuachuas();
  }
  getSuachuas() {
    this.suachuaService.getPhieusuachuas().subscribe(res => {
      return this.suachuaList = res.map(item => {
        return {
          idphieusuachua: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Phieusuachua;
      });
    });
  }
  onDelete(id: string) {
    if (confirm('Are you sure ?')) {
      this.suachuaService.Delete(id);
    }
  }
}
