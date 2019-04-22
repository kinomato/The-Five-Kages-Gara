import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XesuaComponent } from './xesua.component';

describe('XesuaComponent', () => {
  let component: XesuaComponent;
  let fixture: ComponentFixture<XesuaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XesuaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XesuaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
