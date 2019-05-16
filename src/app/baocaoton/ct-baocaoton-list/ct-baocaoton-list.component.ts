import { Component, OnInit, ViewChild } from '@angular/core';
import { PhutungService } from 'src/app/services/phutung.service';
import { Phutung } from 'src/app/models/phutung.model';
import { CtBaocaoton } from 'src/app/models/ct-baocaoton.model';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-ct-baocaoton-list',
  templateUrl: './ct-baocaoton-list.component.html',
  styleUrls: ['./ct-baocaoton-list.component.css']
})
export class CtBaocaotonListComponent implements OnInit {
  displayedColumns: string[] = ['phutung', 'tondau', 'phatsinh', 'toncuoi'];
  phutungList: Phutung[] = [];
  ctbaocaoList;
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private phutungService: PhutungService
  ) {
   }

  ngOnInit() {
    this.initialize();
  }
  getPhutungs() {
    return this.phutungService.getPhutungs().pipe(
      map(res => {
        return res.map(item => {
          return {
            idphutung: item.payload.doc.id,
            ...item.payload.doc.data()
          } as Phutung;
        }).map(phutung => {
          return {
            phutung: phutung.tenphutung,
            tondau: phutung.soluong,
            phatsinh: phutung.phatsinh,
            toncuoi: phutung.soluongconlai
          };
        });
      })
    );
  }
  initialize() {
    this.getPhutungs().subscribe(res => {
      console.log('baocaoton still running');
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
    });
  }
}
