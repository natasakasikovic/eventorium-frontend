import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastEventsOverviewComponent } from './past-events-overview.component';

describe('PastEventsOverviewComponent', () => {
  let component: PastEventsOverviewComponent;
  let fixture: ComponentFixture<PastEventsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PastEventsOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PastEventsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
