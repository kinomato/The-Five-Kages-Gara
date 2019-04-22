import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiencongComponent } from './tiencong.component';

describe('TiencongComponent', () => {
  let component: TiencongComponent;
  let fixture: ComponentFixture<TiencongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiencongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiencongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
