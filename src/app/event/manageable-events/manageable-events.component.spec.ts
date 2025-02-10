import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageableEventsComponent } from './manageable-events.component';

describe('ManageableEventsComponent', () => {
  let component: ManageableEventsComponent;
  let fixture: ComponentFixture<ManageableEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageableEventsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageableEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
