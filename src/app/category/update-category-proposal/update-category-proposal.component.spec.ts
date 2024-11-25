import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCategoryProposalComponent } from './update-category-proposal.component';

describe('UpdateCategoryProposalComponent', () => {
  let component: UpdateCategoryProposalComponent;
  let fixture: ComponentFixture<UpdateCategoryProposalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateCategoryProposalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCategoryProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
