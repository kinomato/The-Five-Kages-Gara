import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CtNhapphutungListComponent } from './ct-nhapphutung-list.component';

describe('CtNhapphutungListComponent', () => {
  let component: CtNhapphutungListComponent;
  let fixture: ComponentFixture<CtNhapphutungListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CtNhapphutungListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CtNhapphutungListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
