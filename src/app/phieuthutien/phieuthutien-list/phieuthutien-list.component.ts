import { Component, OnInit } from '@angular/core';
import { PhieuthutienService } from '../../services/phieuthutien.service';
import { Phieuthutien } from 'src/app/models/phieuthutien.model';
import { ToastrService } from 'ngx-toastr';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-phieuthutien-list',
  templateUrl: './phieuthutien-list.component.html',
  styleUrls: ['./phieuthutien-list.component.css']
})
export class PhieuthutienListComponent implements OnInit {
  thutienList$: Observable<Phieuthutien[]>;
  searchvalue: string;
  key = 'tenchuxe'; // set default
  reverse = false;
  p = 1;
  subthutien: Subscription;
  constructor(
    private thutienService: PhieuthutienService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.getThutiens();
  }
  OnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.subthutien.unsubscribe();
  }
  getThutiens() {
    this.thutienList$ = this.thutienService.getPhieuthutiens().pipe(
      map(res => {
        return  res.map(item => {
          return {
            idphieuthutien: item.payload.doc.id,
            ...item.payload.doc.data()
          } as Phieuthutien;
        });
      })
    );
  }
  onDelete(id: string) {
    if (confirm('Are you sure ?')) {
      this.thutienService.Delete(id)
        .then(() => {
          this.toastr.success('Đã thêm vào thùng rác', 'Xóa phiếu sửa');
        },
          () => {
            this.toastr.warning('Bạn không đủ quyền lực', 'Thất bại');
          })
        .catch(err => {
          this.toastr.error('Xóa thất bại', err);
        });
    }
  }
  /* show() {
    this.thutienList.forEach(element => {
      console.log(element);
    });
  } */
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
}
