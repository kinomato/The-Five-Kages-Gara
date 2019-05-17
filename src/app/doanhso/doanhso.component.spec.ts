import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoanhsoComponent } from './doanhso.component';

describe('DoanhsoComponent', () => {
  let component: DoanhsoComponent;
  let fixture: ComponentFixture<DoanhsoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoanhsoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoanhsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
