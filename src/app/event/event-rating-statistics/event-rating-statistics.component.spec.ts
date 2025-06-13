import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventRatingStatisticsComponent } from './event-rating-statistics.component';

describe('EventRatingStatisticsComponent', () => {
  let component: EventRatingStatisticsComponent;
  let fixture: ComponentFixture<EventRatingStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventRatingStatisticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventRatingStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
