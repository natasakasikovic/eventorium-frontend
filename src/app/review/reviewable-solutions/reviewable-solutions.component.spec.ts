import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewableSolutionsComponent } from './reviewable-solutions.component';

describe('ReviewListComponent', () => {
  let component: ReviewableSolutionsComponent;
  let fixture: ComponentFixture<ReviewableSolutionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewableSolutionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewableSolutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
