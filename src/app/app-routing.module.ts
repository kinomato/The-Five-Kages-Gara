import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { EmployeeDetailComponent } from './employees/employee-detail/employee-detail.component';
import { EmployeeComponent } from './employees/employee/employee.component';
import { PhieutiepnhanComponent } from './phieutiepnhan/phieutiepnhan.component';
import { PhieutiepnhanListComponent } from './phieutiepnhan/phieutiepnhan-list/phieutiepnhan-list.component';
import { PhieutiepnhanDetailComponent } from './phieutiepnhan/phieutiepnhan-detail/phieutiepnhan-detail.component';
import { HieuxeNewComponent } from './hieuxe/hieuxe-new/hieuxe-new.component';
import { HieuxeListComponent } from './hieuxe/hieuxe-list/hieuxe-list.component';
import { HieuxeDetailComponent } from './hieuxe/hieuxe-detail/hieuxe-detail.component';
import { XesuaComponent } from './xesua/xesua.component';
import { KhachhangDetailComponent } from './khachhang/khachhang-detail/khachhang-detail.component';
import { KhachhangNewComponent } from './khachhang/khachhang-new/khachhang-new.component';
import { PhutungDetailComponent } from './phutung/phutung-detail/phutung-detail.component';
import { PhutungNewComponent } from './phutung/phutung-new/phutung-new.component';
import { PhutungListComponent } from './phutung/phutung-list/phutung-list.component';
import { KhachhangListComponent } from './khachhang/khachhang-list/khachhang-list.component';
import { XesuaListComponent } from './xesua/xesua-list/xesua-list.component';
import { TiencongDetailComponent } from './tiencong/tiencong-detail/tiencong-detail.component';
import { TiencongNewComponent } from './tiencong/tiencong-new/tiencong-new.component';
import { TiencongListComponent } from './tiencong/tiencong-list/tiencong-list.component';
import { PhieutiepnhanNewComponent } from './phieutiepnhan/phieutiepnhan-new/phieutiepnhan-new.component';
import { ThamsoDetailComponent } from './thamso/thamso-detail/thamso-detail.component';
import { ThamsoNewComponent } from './thamso/thamso-new/thamso-new.component';
import { ThamsoListComponent } from './thamso/thamso-list/thamso-list.component';
import { PhieusuachuaNewComponent } from './phieusuachua/phieusuachua-new/phieusuachua-new.component';
import { PhieusuachuaListComponent } from './phieusuachua/phieusuachua-list/phieusuachua-list.component';
import { PhieusuachuaDetailComponent } from './phieusuachua/phieusuachua-detail/phieusuachua-detail.component';
import { DanhsachxeComponent } from './danhsachxe/danhsachxe.component';
import { PhieuthutienListComponent } from './phieuthutien/phieuthutien-list/phieuthutien-list.component';
import { PhieuthutienNewComponent } from './phieuthutien/phieuthutien-new/phieuthutien-new.component';
import { PhieuthutienDetailComponent } from './phieuthutien/phieuthutien-detail/phieuthutien-detail.component';
import { NhapphutungNewComponent } from './nhapphutung/nhapphutung-new/nhapphutung-new.component';
import { NhapphutungListComponent } from './nhapphutung/nhapphutung-list/nhapphutung-list.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { HomeComponent } from './home/home.component';
import { RecycleComponent } from './recycle/recycle.component';




const routes: Routes = [
  { path: '', redirectTo: '/trangchu', pathMatch: 'full' },
  { path: 'employees/detail/:id', component: EmployeeDetailComponent },
  { path: 'employees/new', component: EmployeeComponent },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'trangchu', component: HomeComponent },
  { path: 'phieutiepnhan/detail/:id', component: PhieutiepnhanDetailComponent },
  { path: 'phieutiepnhan/new', component: PhieutiepnhanNewComponent },
  { path: 'phieutiepnhan', component: PhieutiepnhanListComponent },
  { path: 'hieuxe/detail/:id', component: HieuxeDetailComponent },
  { path: 'hieuxe/new', component: HieuxeNewComponent },
  { path: 'hieuxe', component: HieuxeListComponent },
  { path: 'khachhang/detail/:id', component: KhachhangDetailComponent },
  { path: 'khachhang/new', component: KhachhangNewComponent },
  { path: 'khachhang', component: KhachhangListComponent },
  { path: 'phutung/detail/:id', component: PhutungDetailComponent },
  { path: 'phutung/new', component: PhutungNewComponent },
  { path: 'phutung', component: PhutungListComponent },
  /* { path: 'xesua/detail/:id', component: XesuaComponent },
  { path: 'xesua/new', component: XesuaComponent },
  { path: 'xesua', component: XesuaListComponent }, */
  { path: 'tiencong/detail/:id', component: TiencongDetailComponent },
  { path: 'tiencong/new', component: TiencongNewComponent },
  { path: 'tiencong', component: TiencongListComponent },
  { path: 'thamso/detail/:id', component: ThamsoDetailComponent },
  { path: 'thamso/new', component: ThamsoNewComponent },
  { path: 'thamso', component: ThamsoListComponent },
  { path: 'suachua/detail/:id', component: PhieusuachuaDetailComponent },
  { path: 'suachua/new', component: PhieusuachuaNewComponent },
  { path: 'suachua', component: PhieusuachuaListComponent },
  { path: 'danhsachxe', component: DanhsachxeComponent },
  { path: 'thutien/detail/:id', component: PhieuthutienDetailComponent },
  { path: 'thutien/new', component: PhieuthutienNewComponent },
  { path: 'thutien', component: PhieuthutienListComponent },
  { path: 'nhapphutung/new', component: NhapphutungNewComponent },
  { path: 'nhapphutung', component: NhapphutungListComponent },
  { path: 'user/profile', component: UserProfileComponent },
  { path: 'recycle', component: RecycleComponent },
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
