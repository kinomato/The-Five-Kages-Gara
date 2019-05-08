import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhapphutungNewComponent } from './nhapphutung-new.component';

describe('NhapphutungNewComponent', () => {
  let component: NhapphutungNewComponent;
  let fixture: ComponentFixture<NhapphutungNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhapphutungNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhapphutungNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
