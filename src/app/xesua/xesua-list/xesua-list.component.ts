import { Component, OnInit } from '@angular/core';
import { XesuaService } from '../shared/xesua.service';
import { Xesua } from 'src/app/models/xesua.model';

@Component({
  selector: 'app-xesua-list',
  templateUrl: './xesua-list.component.html',
  styleUrls: ['./xesua-list.component.css']
})
export class XesuaListComponent implements OnInit {
  xesuaList: Xesua[];
  constructor(private xesuaService: XesuaService) { }

  ngOnInit() {
    this.getXesuas();
  }
  getXesuas() {
  this.xesuaService.getXesuas().subscribe(actionArray => {
      this.xesuaList = actionArray.map(item => {
        return {
          idxesua: item.payload.doc.id,
          ...item.payload.doc.data() } as Xesua;
      });
    });
  }
  onDelete(id: string) {
    if (confirm('are you sure ?')) {
      this.xesuaService.Delete(id);
    }
  }
}
