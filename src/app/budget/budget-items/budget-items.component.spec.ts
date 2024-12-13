import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetItemsComponent } from './budget-items.component';

describe('BudgetItemsComponent', () => {
  let component: BudgetItemsComponent;
  let fixture: ComponentFixture<BudgetItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BudgetItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
