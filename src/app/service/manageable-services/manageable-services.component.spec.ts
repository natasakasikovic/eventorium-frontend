import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageableServicesComponent } from './manageable-services.component';

describe('ManageableServicesComponent', () => {
  let component: ManageableServicesComponent;
  let fixture: ComponentFixture<ManageableServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageableServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageableServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
