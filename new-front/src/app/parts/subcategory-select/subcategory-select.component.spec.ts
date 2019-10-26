import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategorySelectComponent } from './subcategory-select.component';

describe('SubcategorySelectComponent', () => {
  let component: SubcategorySelectComponent;
  let fixture: ComponentFixture<SubcategorySelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubcategorySelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcategorySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
