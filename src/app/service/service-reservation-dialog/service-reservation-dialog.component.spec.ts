import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ServiceReservationDialogComponent } from "./service-reservation-dialog.component";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { runInvalidFormTestCases } from "../../../testing/util/form-validation.utils";
import { invalidReservationTestCases, mockInvalidReservationForm, mockValidReservationForm } from "../../../testing/mocks/reservation-form.mock";
import { mockServiceWithFixedDuration, mockServiceWithRangeDuration } from "../../../testing/mocks/service.mock";
import { ServiceService } from "../service.service";
import { of } from "rxjs";
import { BudgetItemStatus } from "../../budget/model/budget-item-status.enum";
import { MaterialModule } from "../../infrastructure/material/material.module";

describe('ServiceReservationDialogComponent', () => {

  let component: ServiceReservationDialogComponent;
  let fixture: ComponentFixture<ServiceReservationDialogComponent>;

  let serviceServiceSpy = jasmine.createSpyObj('ServiceService', ['get', 'reserveService']);
  let dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

  serviceServiceSpy.get.and.returnValue(of(mockServiceWithRangeDuration));
  const mockDialogData = { eventId: 1, serviceId: 2, plannedAmount: 100 };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceReservationDialogComponent],
      imports: [
        ReactiveFormsModule,
        MaterialModule,
        NoopAnimationsModule
      ],
       providers: [
      { provide: ServiceService, useValue: serviceServiceSpy},
      { provide: MatDialogRef, useValue: dialogRefSpy }, 
      { provide: MAT_DIALOG_DATA, useValue: mockDialogData }
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

  it('should close dialog after with PROCESSED and spentAmount != 0 for automatic reservations', () => {
    component.service = mockServiceWithRangeDuration;
    const reservationResponse = of(undefined)

    serviceServiceSpy.reserveService.and.returnValue(reservationResponse);

     component.reservationForm = new FormGroup({
      startingTime: new FormControl('10:00 AM'),
      endingTime: new FormControl('11:00 AM')
    });

    component.reserve();

    expect(serviceServiceSpy.reserveService).toHaveBeenCalled();

     expect(dialogRefSpy.close).toHaveBeenCalledWith({
      spentAmount: 300 * (1 - 10 / 100), 
      status: BudgetItemStatus.PROCESSED
    });
  })

  it('should close dialog with PENDING and spentAmount=0 for manual reservations', () => {
    component.service = mockServiceWithFixedDuration;

    serviceServiceSpy.reserveService.and.returnValue(of(undefined));
    component.reservationForm = new FormGroup({
      startingTime: new FormControl('09:00 AM'),
      endingTime: new FormControl('11:00 AM')
    });

    component.reserve();

    expect(serviceServiceSpy.reserveService).toHaveBeenCalled();

    expect(dialogRefSpy.close).toHaveBeenCalledWith({
      spentAmount: 0.0,
      status: BudgetItemStatus.PENDING
    });
  });


  it('should send reservation data when form is submitted', () => {
    
    component.reservationForm.setValue({
      startingTime: '10:00 AM',
      endingTime: '11:00 AM'
    });

    serviceServiceSpy.reserveService.and.returnValue(of(undefined))

    component.reserve();

    expect(serviceServiceSpy.reserveService).toHaveBeenCalledWith(
      {
        startingTime: '10:00 AM',
        endingTime: '11:00 AM',
        plannedAmount: mockDialogData.plannedAmount
      },
      mockDialogData.eventId,
      mockDialogData.serviceId
    )
  })
});