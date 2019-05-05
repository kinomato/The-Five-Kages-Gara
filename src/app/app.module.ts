import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { SelectDropDownModule } from 'ngx-select-dropdown';
import { NumericTextboxModule } from 'ngx-numeric-textbox';



/* import { BoardComponent } from './board/board.component'; */
import { environment } from 'src/environments/environment';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeComponent } from './employees/employee/employee.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { EmployeeService } from './employees/shared/employee.service';
import { EmployeeDetailComponent } from './employees/employee-detail/employee-detail.component';
import { PhieutiepnhanComponent } from './phieutiepnhan/phieutiepnhan.component';
import { PhieutiepnhanNewComponent } from './phieutiepnhan/phieutiepnhan-new/phieutiepnhan-new.component';
import { PhieutiepnhanDetailComponent } from './phieutiepnhan/phieutiepnhan-detail/phieutiepnhan-detail.component';
import { PhieutiepnhanListComponent } from './phieutiepnhan/phieutiepnhan-list/phieutiepnhan-list.component';
import { KhachhangComponent } from './khachhang/khachhang.component';
import { XesuaComponent } from './xesua/xesua.component';
import { HieuxeComponent } from './hieuxe/hieuxe.component';
import { TiencongComponent } from './tiencong/tiencong.component';
import { ThamsoComponent } from './thamso/thamso.component';
import { PhutungComponent } from './phutung/phutung.component';
import { HeaderComponent } from './header/header.component';
import { HieuxeNewComponent } from './hieuxe/hieuxe-new/hieuxe-new.component';
import { HieuxeDetailComponent } from './hieuxe/hieuxe-detail/hieuxe-detail.component';
import { HieuxeListComponent } from './hieuxe/hieuxe-list/hieuxe-list.component';
import { PhutungListComponent } from './phutung/phutung-list/phutung-list.component';
import { PhutungDetailComponent } from './phutung/phutung-detail/phutung-detail.component';
import { PhutungNewComponent } from './phutung/phutung-new/phutung-new.component';
import { ThamsoNewComponent } from './thamso/thamso-new/thamso-new.component';
import { TiencongNewComponent } from './tiencong/tiencong-new/tiencong-new.component';
import { TiencongDetailComponent } from './tiencong/tiencong-detail/tiencong-detail.component';
import { ThamsoDetailComponent } from './thamso/thamso-detail/thamso-detail.component';
import { ThamsoListComponent } from './thamso/thamso-list/thamso-list.component';
import { TiencongListComponent } from './tiencong/tiencong-list/tiencong-list.component';
import { XesuaListComponent } from './xesua/xesua-list/xesua-list.component';
import { KhachhangListComponent } from './khachhang/khachhang-list/khachhang-list.component';
import { KhachhangNewComponent } from './khachhang/khachhang-new/khachhang-new.component';
import { KhachhangDetailComponent } from './khachhang/khachhang-detail/khachhang-detail.component';
import { MatAutocompleteModule, MatInputModule, MatFormFieldModule} from '@angular/material';
import { PhieusuachuaComponent } from './phieusuachua/phieusuachua.component';
import { PhieusuachuaNewComponent } from './phieusuachua/phieusuachua-new/phieusuachua-new.component';
import { CTPhieusuachuaListComponent } from './phieusuachua/phieusuachua-new/ct-phieusuachua-list/ct-phieusuachua-list.component';
import { PhieusuachuaListComponent } from './phieusuachua/phieusuachua-list/phieusuachua-list.component';
import { PhieusuachuaDetailComponent } from './phieusuachua/phieusuachua-detail/phieusuachua-detail.component';
// tslint:disable-next-line: max-line-length
import { CtPhieusuachuaDetailListComponent } from './phieusuachua/phieusuachua-detail/ct-phieusuachua-detail-list/ct-phieusuachua-detail-list.component';
import { DaytimeyearPipe } from './custompipe/daytimeyear.pipe';
import { DanhsachxeComponent } from './danhsachxe/danhsachxe.component';
import { PhieuthutienComponent } from './phieuthutien/phieuthutien.component';
import { PhieuthutienNewComponent } from './phieuthutien/phieuthutien-new/phieuthutien-new.component';
import { PhieuthutienListComponent } from './phieuthutien/phieuthutien-list/phieuthutien-list.component';
import { PhieuthutienDetailComponent } from './phieuthutien/phieuthutien-detail/phieuthutien-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    EmployeeComponent,
    EmployeeListComponent,
    EmployeeDetailComponent,
    PhieutiepnhanComponent,
    PhieutiepnhanNewComponent,
    PhieutiepnhanDetailComponent,
    PhieutiepnhanListComponent,
    KhachhangComponent,
    XesuaComponent,
    HieuxeComponent,
    TiencongComponent,
    ThamsoComponent,
    PhutungComponent,
    HeaderComponent,
    HieuxeNewComponent,
    HieuxeDetailComponent,
    HieuxeListComponent,
    PhutungListComponent,
    PhutungDetailComponent,
    PhutungNewComponent,
    ThamsoNewComponent,
    TiencongNewComponent,
    TiencongDetailComponent,
    ThamsoDetailComponent,
    ThamsoListComponent,
    TiencongListComponent,
    XesuaListComponent,
    KhachhangListComponent,
    KhachhangNewComponent,
    KhachhangDetailComponent,
    PhieusuachuaComponent,
    PhieusuachuaNewComponent,
    CTPhieusuachuaListComponent,
    PhieusuachuaListComponent,
    PhieusuachuaDetailComponent,
    CtPhieusuachuaDetailListComponent,
    DaytimeyearPipe,
    DanhsachxeComponent,
    PhieuthutienComponent,
    PhieuthutienNewComponent,
    PhieuthutienListComponent,
    PhieuthutienDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    /* FormControl, */
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AppRoutingModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    NgbModule,
    NgbDatepickerModule,
    SelectDropDownModule,
    NumericTextboxModule
  ],
  exports: [
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    NgbDatepickerModule
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
