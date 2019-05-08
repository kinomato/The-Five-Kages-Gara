import { Component, OnInit } from '@angular/core';
import { PhieuthutienService } from '../../services/phieuthutien.service';
import { Phieuthutien } from 'src/app/models/phieuthutien.model';

@Component({
  selector: 'app-phieuthutien-list',
  templateUrl: './phieuthutien-list.component.html',
  styleUrls: ['./phieuthutien-list.component.css']
})
export class PhieuthutienListComponent implements OnInit {
  thutienList = [];
  constructor(private thutienService: PhieuthutienService) { }

  ngOnInit() {
    this.getThutiens();
  }
  getThutiens() {
    this.thutienService.getPhieuthutiens().subscribe(res => {
      return this.thutienList = res.map(item => {
        return {
          idphieuthutien: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Phieuthutien;
      });
    });
  }
  onDelete(id: string) {
    if (confirm('Are you sure ?')) {
      this.thutienService.Delete(id);
    }
  }
  show() {
    this.thutienList.forEach(element => {
      console.log(element);
    });
  }
}
