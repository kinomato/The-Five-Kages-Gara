import { Component, OnInit } from '@angular/core';
import { PhutungService } from '../../services/phutung.service';
import { Phutung } from 'src/app/models/phutung.model';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-phutung-list',
  templateUrl: './phutung-list.component.html',
  styleUrls: ['./phutung-list.component.css']
})
export class PhutungListComponent implements OnInit {
  phutungList: Phutung[] = [];
  subphutung: Subscription;
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
    this.subphutung = this.phutungService.getPhutungs().subscribe(actionArray => {
      this.phutungList = actionArray.map(item => {
        return {
          idphutung: item.payload.doc.id,
          ...item.payload.doc.data() } as Phutung;
      });
    });
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
