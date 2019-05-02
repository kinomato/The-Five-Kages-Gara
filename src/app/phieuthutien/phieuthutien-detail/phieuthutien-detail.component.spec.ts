import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhieuthutienDetailComponent } from './phieuthutien-detail.component';

describe('PhieuthutienDetailComponent', () => {
  let component: PhieuthutienDetailComponent;
  let fixture: ComponentFixture<PhieuthutienDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhieuthutienDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhieuthutienDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
