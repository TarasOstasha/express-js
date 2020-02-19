import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoryAccordionComponent } from './subcategory-accordion.component';

describe('SubcategoryAccordionComponent', () => {
  let component: SubcategoryAccordionComponent;
  let fixture: ComponentFixture<SubcategoryAccordionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubcategoryAccordionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcategoryAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
