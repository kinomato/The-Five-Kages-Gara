import { Component, OnInit } from '@angular/core';
import { PhieuthutienService } from '../../services/phieuthutien.service';
import { Phieuthutien } from 'src/app/models/phieuthutien.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-phieuthutien-list',
  templateUrl: './phieuthutien-list.component.html',
  styleUrls: ['./phieuthutien-list.component.css']
})
export class PhieuthutienListComponent implements OnInit {
  thutienList = [];
  searchvalue: string;
  key = 'tenchuxe'; // set default
  reverse = false;
  p = 1;

  constructor(
    private thutienService: PhieuthutienService,
    private toastr: ToastrService) { }

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
      this.thutienService.Delete(id)
      .then(() => {
        this.toastr.success('Xóa thành công', 'Xóa phiếu sửa');
      },
      () => {
        this.toastr.warning('Bạn không đủ quyền lực', 'Thất bại');
      })
      .catch(err => {
        this.toastr.error('Xóa thất bại', err);
      });
    }
  }
  show() {
    this.thutienList.forEach(element => {
      console.log(element);
    });
  }
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
}
