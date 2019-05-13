import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CtBaocaotonListComponent } from './ct-baocaoton-list.component';

describe('CtBaocaotonListComponent', () => {
  let component: CtBaocaotonListComponent;
  let fixture: ComponentFixture<CtBaocaotonListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CtBaocaotonListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CtBaocaotonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
