import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhapphutungDetailComponent } from './nhapphutung-detail.component';

describe('NhapphutungDetailComponent', () => {
  let component: NhapphutungDetailComponent;
  let fixture: ComponentFixture<NhapphutungDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhapphutungDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhapphutungDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
