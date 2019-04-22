import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThamsoComponent } from './thamso.component';

describe('ThamsoComponent', () => {
  let component: ThamsoComponent;
  let fixture: ComponentFixture<ThamsoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThamsoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThamsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
