import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MegaSearchComponent } from './mega-search.component';

describe('MegaSearchComponent', () => {
  let component: MegaSearchComponent;
  let fixture: ComponentFixture<MegaSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MegaSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MegaSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
