import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkCategoriesComponent } from './link-categories.component';

describe('LinkCategoriesComponent', () => {
  let component: LinkCategoriesComponent;
  let fixture: ComponentFixture<LinkCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
