import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhapphutungComponent } from './nhapphutung.component';

describe('NhapphutungComponent', () => {
  let component: NhapphutungComponent;
  let fixture: ComponentFixture<NhapphutungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhapphutungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhapphutungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
