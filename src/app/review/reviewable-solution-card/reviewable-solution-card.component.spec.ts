import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewableSolutionCardComponent } from './reviewable-solution-card.component';

describe('ReviewCardComponent', () => {
  let component: ReviewableSolutionCardComponent;
  let fixture: ComponentFixture<ReviewableSolutionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewableSolutionCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewableSolutionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
