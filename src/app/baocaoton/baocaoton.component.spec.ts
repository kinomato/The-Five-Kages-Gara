import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaocaotonComponent } from './baocaoton.component';

describe('BaocaotonComponent', () => {
  let component: BaocaotonComponent;
  let fixture: ComponentFixture<BaocaotonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaocaotonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaocaotonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
