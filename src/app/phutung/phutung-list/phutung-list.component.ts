import { Component, OnInit } from '@angular/core';
import { PhutungService } from '../shared/phutung.service';
import { Phutung } from 'src/app/models/phutung.model';

@Component({
  selector: 'app-phutung-list',
  templateUrl: './phutung-list.component.html',
  styleUrls: ['./phutung-list.component.css']
})
export class PhutungListComponent implements OnInit {
  phutungList: Phutung[];

  constructor(private phutungService: PhutungService) { }

  ngOnInit() {
    this.getPhutungs();
  }
  getPhutungs() {
    this.phutungService.getPhutungs().subscribe(actionArray => {
      this.phutungList = actionArray.map(item => {
        return {
          idphutung: item.payload.doc.id,
          ...item.payload.doc.data() } as Phutung;
      });
    });
  }
  onDelete(id: string) {
    if (confirm('are you sure ?')) {
      this.phutungService.Delete(id);
    }
  }
}
