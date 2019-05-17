import { Component, OnInit } from '@angular/core';
import { HieuxeService } from '../../services/hieuxe.service';
import { Hieuxe } from 'src/app/models/hieuxe.model';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hieuxe-list',
  templateUrl: './hieuxe-list.component.html',
  styleUrls: ['./hieuxe-list.component.css']
})
export class HieuxeListComponent implements OnInit {
  hieuxeList: Hieuxe[] = [];
  isshow = true;
  subhieuxe: Subscription;
  constructor(
    private hieuxeService: HieuxeService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.getHieuxes();
  }
  OnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.subhieuxe.unsubscribe();
  }
  getHieuxes() {
    this.subhieuxe = this.hieuxeService.getHieuXes().subscribe(actionArray => {
      return this.hieuxeList = actionArray.map(item => {
        /* console.log('im still running too'); */
        return {
          idhieuxe: item.payload.doc.id,
          ...item.payload.doc.data() } as Hieuxe;
      });
    });
  }
  onDelete(id: string) {
    if (confirm('are you sure ?')) {
      this.hieuxeService.Delete(id)
      .then(() => {
        this.toastr.success('Xóa thành công', 'Hiệu xe');
        this.isshow = true;
      },
      reject => {
        this.toastr.warning('Bạn không có quyền', 'Thất bại');
        this.isshow = true;
      })
      .catch(err => {
        this.toastr.error(err, 'Đã xảy ra lỗi');
        this.isshow = true;
      });
    }
  }
}
