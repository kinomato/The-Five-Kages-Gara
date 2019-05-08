import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhapphutungListComponent } from './nhapphutung-list.component';

describe('NhapphutungListComponent', () => {
  let component: NhapphutungListComponent;
  let fixture: ComponentFixture<NhapphutungListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhapphutungListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhapphutungListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
