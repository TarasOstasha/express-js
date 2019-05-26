import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketPopupComponent } from './basket-popup.component';

describe('BasketPopupComponent', () => {
  let component: BasketPopupComponent;
  let fixture: ComponentFixture<BasketPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasketPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
