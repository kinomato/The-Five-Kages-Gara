import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhutungComponent } from './phutung.component';

describe('PhutungComponent', () => {
  let component: PhutungComponent;
  let fixture: ComponentFixture<PhutungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhutungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhutungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
