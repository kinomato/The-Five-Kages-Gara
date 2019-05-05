import { Component, OnInit } from '@angular/core';
import { Thamso } from 'src/app/models/thamso.model';
import { ThamsoService } from '../../services/thamso.service';

@Component({
  selector: 'app-thamso-list',
  templateUrl: './thamso-list.component.html',
  styleUrls: ['./thamso-list.component.css']
})
export class ThamsoListComponent implements OnInit {
  thamsoList: Thamso[];

  constructor(private thamsoService: ThamsoService) { }

  ngOnInit() {
    this.getThamsos();
  }
  getThamsos() {
    this.thamsoService.getThamsos().subscribe(actionArray => {
      this.thamsoList = actionArray.map(item => {
        return {
          idthamso: item.payload.doc.id,
          ...item.payload.doc.data() } as Thamso;
      });
    });
  }
  onDelete(id: string) {
    if (confirm('are you sure ?')) {
      this.thamsoService.Delete(id);
    }
  }
}
