import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ServiceReservationDialogComponent } from "./service-reservation-dialog.component";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { ReactiveFormsModule } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { runInvalidFormTestCases } from "../../../testing/util/form-validation.utils";
import { invalidReservationTestCases, mockInvalidReservationForm, mockValidReservationForm } from "../../../testing/mocks/reservation-form.mock";
import { mockServiceWithFixedDuration, mockServiceWithRangeDuration } from "../../../testing/mocks/service.mock";

describe('ServiceReservationDialogComponent', () => {

  let component: ServiceReservationDialogComponent;
  let fixture: ComponentFixture<ServiceReservationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceReservationDialogComponent],
      imports: [HttpClientTestingModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        NgxMaterialTimepickerModule,
        ReactiveFormsModule,
        NoopAnimationsModule
      ],
       providers: [
      { provide: MatDialogRef, useValue: {} }, 
      { provide: MAT_DIALOG_DATA, useValue: {} }
    ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceReservationDialogComponent);
    component = fixture.componentInstance;
    component.service = mockServiceWithRangeDuration;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should initialize form with empty values', () => {
    expect(component.reservationForm.get('startingTime')?.value).toBe('')
    expect(component.reservationForm.get('endingTime')?.value).toBe('')
  });


  it('should validate required fields', () => {
    runInvalidFormTestCases(
      component.reservationForm,
      fixture,
      '#reserve-button',
      mockValidReservationForm,
      invalidReservationTestCases
    )
  })


  it('should enable reserve button when the form is valid', () => {
      const reserveButton = fixture.nativeElement.querySelector('#reserve-button');
      component.reservationForm.setValue(mockValidReservationForm)
      fixture.detectChanges();
      expect(reserveButton.disabled).toBeFalsy()
  })

  it('should disable reserve button when form is invalid', () => {
    const reserveButton = fixture.nativeElement.querySelector('#reserve-button');
    component.reservationForm.setValue(mockInvalidReservationForm);
    fixture.detectChanges();
    expect(reserveButton.disabled).toBeTruthy();
  });


  it('should auto-fill ending time when minDuration equals maxDuration', () => {
    component.service = mockServiceWithFixedDuration;
    const control = component.reservationForm.get('startingTime')

    control.setValue('10:00 AM')
    fixture.detectChanges();

    const endingTime = component.reservationForm.get('endingTime').value;
    expect(endingTime).toBe('12:00 PM')
  })


  it('should not auto-fill when minDuration is not equal to maxDuration', () => {
    component.service = mockServiceWithRangeDuration;
    const control = component.reservationForm.get('startingTime')

    control.setValue('10:00 AM');
    fixture.detectChanges();

    const endingTime = component.reservationForm.get('endingTime').value;
    expect(endingTime).toBe('')
  })
});