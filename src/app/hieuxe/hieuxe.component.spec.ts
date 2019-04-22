import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HieuxeComponent } from './hieuxe.component';

describe('HieuxeComponent', () => {
  let component: HieuxeComponent;
  let fixture: ComponentFixture<HieuxeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HieuxeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HieuxeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
