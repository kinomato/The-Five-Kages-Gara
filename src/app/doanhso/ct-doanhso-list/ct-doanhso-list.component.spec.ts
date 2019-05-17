import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CtDoanhsoListComponent } from './ct-doanhso-list.component';

describe('CtDoanhsoListComponent', () => {
  let component: CtDoanhsoListComponent;
  let fixture: ComponentFixture<CtDoanhsoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CtDoanhsoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CtDoanhsoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
