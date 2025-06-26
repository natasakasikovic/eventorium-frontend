import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesFilterDialogComponent } from './services-filter-dialog.component';

describe('ServicesFilterDialogComponent', () => {
  let component: ServicesFilterDialogComponent;
  let fixture: ComponentFixture<ServicesFilterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServicesFilterDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesFilterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
