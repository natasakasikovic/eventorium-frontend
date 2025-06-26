import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetSuggestionCardComponent } from './budget-suggestion-card.component';

describe('BudgetSuggestionCardComponent', () => {
  let component: BudgetSuggestionCardComponent;
  let fixture: ComponentFixture<BudgetSuggestionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BudgetSuggestionCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetSuggestionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
