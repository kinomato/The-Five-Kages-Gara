import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhieulistComponent } from './phieulist.component';

describe('PhieulistComponent', () => {
  let component: PhieulistComponent;
  let fixture: ComponentFixture<PhieulistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhieulistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhieulistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
