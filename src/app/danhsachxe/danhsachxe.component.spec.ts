import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachxeComponent } from './danhsachxe.component';

describe('DanhsachxeComponent', () => {
  let component: DanhsachxeComponent;
  let fixture: ComponentFixture<DanhsachxeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhsachxeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachxeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
