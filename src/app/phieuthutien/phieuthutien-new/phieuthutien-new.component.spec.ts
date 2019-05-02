import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhieuthutienNewComponent } from './phieuthutien-new.component';

describe('PhieuthutienNewComponent', () => {
  let component: PhieuthutienNewComponent;
  let fixture: ComponentFixture<PhieuthutienNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhieuthutienNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhieuthutienNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
