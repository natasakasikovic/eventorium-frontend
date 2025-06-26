import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventTypesOverviewComponent } from './event-types-overview.component';

describe('EventTypesOverviewComponent', () => {
  let component: EventTypesOverviewComponent;
  let fixture: ComponentFixture<EventTypesOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventTypesOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventTypesOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
