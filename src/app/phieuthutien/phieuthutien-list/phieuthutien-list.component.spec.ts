import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhieuthutienListComponent } from './phieuthutien-list.component';

describe('PhieuthutienListComponent', () => {
  let component: PhieuthutienListComponent;
  let fixture: ComponentFixture<PhieuthutienListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhieuthutienListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhieuthutienListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
