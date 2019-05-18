import { Component, OnInit } from '@angular/core';
import { PhutungService } from '../../services/phutung.service';
import { Phutung } from 'src/app/models/phutung.model';
import { ToastrService } from 'ngx-toastr';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-phutung-list',
  templateUrl: './phutung-list.component.html',
  styleUrls: ['./phutung-list.component.css']
})
export class PhutungListComponent implements OnInit {
  phutungList$: Observable<Phutung[]>;
  subphutung: Subscription;
  p = 1;
  constructor(
    private phutungService: PhutungService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.getPhutungs();
  }
  OnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.subphutung.unsubscribe();
  }
  getPhutungs() {
    this.phutungList$ = this.phutungService.getPhutungs().pipe(
      map(actionArray => {
        return actionArray.map(item => {
          return {
            idphutung: item.payload.doc.id,
            ...item.payload.doc.data()
          } as Phutung;
        });
      })
    );
  }
  onDelete(id: string) {
    if (confirm('are you sure ?')) {
      this.phutungService.Delete(id)
        .then(() => {
          this.toastr.success('Đã thêm vào thùng rác', 'Xóa phụ tùng');
        },
          reject => {
            this.toastr.warning('Bạn không đủ quyền', 'Thất bại');
          })
        .catch(err => {
          this.toastr.error(err, 'Đã xảy ra lỗi');
        });
    }
  }
}
