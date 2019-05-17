import { Component, OnInit } from '@angular/core';
import { TiencongService } from '../../services/tiencong.service';
import { Tiencong } from 'src/app/models/tiencong.model';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tiencong-list',
  templateUrl: './tiencong-list.component.html',
  styleUrls: ['./tiencong-list.component.css']
})
export class TiencongListComponent implements OnInit {
  tiencongList: Tiencong[] = [];
  substiencong: Subscription;
  constructor(
    private tiencongService: TiencongService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.getTiencongs();
  }
  OnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.substiencong.unsubscribe();
  }
  getTiencongs() {
    this.substiencong = this.tiencongService.getTiencongs().subscribe(actionArray => {
      this.tiencongList = actionArray.map(item => {
        return {
          idtiencong: item.payload.doc.id,
          ...item.payload.doc.data() } as Tiencong;
      });
    });
  }
  onDelete(id: string) {
    if (confirm('are you sure ?')) {
      this.tiencongService.Delete(id)
      .then(() => {
        this.toastr.success('Thêm thành công', 'Tiền công');
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
