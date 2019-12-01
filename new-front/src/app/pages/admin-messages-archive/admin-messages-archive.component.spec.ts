import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMessagesArchiveComponent } from './admin-messages-archive.component';

describe('AdminMessagesArchiveComponent', () => {
  let component: AdminMessagesArchiveComponent;
  let fixture: ComponentFixture<AdminMessagesArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMessagesArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMessagesArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
