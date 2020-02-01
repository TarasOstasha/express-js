import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MegaSearch2Component } from './mega-search2.component';

describe('MegaSearch2Component', () => {
  let component: MegaSearch2Component;
  let fixture: ComponentFixture<MegaSearch2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MegaSearch2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MegaSearch2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
