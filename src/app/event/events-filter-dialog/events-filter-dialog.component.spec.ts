import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsFilterDialogComponent } from './events-filter-dialog.component';

describe('EventsFilterDialogComponent', () => {
  let component: EventsFilterDialogComponent;
  let fixture: ComponentFixture<EventsFilterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventsFilterDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventsFilterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
