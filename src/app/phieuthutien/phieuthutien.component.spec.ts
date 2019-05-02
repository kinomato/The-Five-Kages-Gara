import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhieuthutienComponent } from './phieuthutien.component';

describe('PhieuthutienComponent', () => {
  let component: PhieuthutienComponent;
  let fixture: ComponentFixture<PhieuthutienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhieuthutienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhieuthutienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
