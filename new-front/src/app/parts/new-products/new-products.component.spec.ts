import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProductsComponent } from './new-products.component';

describe('NewProductsComponent', () => {
  let component: NewProductsComponent;
  let fixture: ComponentFixture<NewProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
