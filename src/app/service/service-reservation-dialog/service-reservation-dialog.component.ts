import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ServiceService } from '../service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { InfoDialogComponent } from '../../shared/info-dialog/info-dialog.component';
import { ERROR_MESSAGES } from '../../shared/constants/error-messages';
import { MESSAGES } from '../../shared/constants/messages';
import { HttpErrorResponse } from '@angular/common/http';
import { ReservationRequest } from '../model/reservation-request.model';
import { Service } from '../model/service.model';
import { ReservationType } from '../model/reservation-type.enum';

@Component({
  selector: 'app-service-reservation-dialog',
  templateUrl: './service-reservation-dialog.component.html',
  styleUrl: './service-reservation-dialog.component.css'
})
export class ServiceReservationDialogComponent implements OnInit{

  reservationForm: FormGroup;
  service: Service;

  constructor(public dialogRef: MatDialogRef<ServiceReservationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: { eventId: number, serviceId: number },
              private serviceService: ServiceService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.initializeForm();
    this.fetchService();
    this.setUpListener();
  }

  reserve(): void {
    if (this.reservationForm.invalid)
      return;

    this.submitReservation(this.reservationForm.value)
  }

  private initializeForm(): void {
    this.reservationForm = new FormGroup({
      startingTime: new FormControl('', Validators.required),
      endingTime: new FormControl('', Validators.required)
    });
  }

  private fetchService(): void {
    this.serviceService.get(this.data.serviceId).subscribe({
      next: (service: Service) => this.service = service
    })
  }

  private setUpListener(): void {
    this.reservationForm.get('startingTime')?.valueChanges.subscribe((startingTime) => {
      
      if (this.service.type === ReservationType.MANUAL) return;
  
      const minDuration = this.service.minDuration || 0;
      const endingTime = this.calculateEndingTime(startingTime, minDuration);

      this.reservationForm.patchValue({ endingTime });
    });
  }
  
  private calculateEndingTime(startingTime: string, minDuration: number): string {
    const currentDate = new Date();
  
    const [hours, minutesWithAmPm] = startingTime.split(':');
    const [minutes, amPm] = minutesWithAmPm.split(' ');
  
    let parsedHours = parseInt(hours);
    const parsedMinutes = parseInt(minutes);

    if (amPm.toUpperCase() === 'PM' && parsedHours < 12) parsedHours += 12;
    if (amPm.toUpperCase() === 'AM' && parsedHours === 12) parsedHours = 0;

    currentDate.setHours(parsedHours, parsedMinutes, 0, 0);
    currentDate.setHours(currentDate.getHours() + minDuration);
  
    return currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  }

  private submitReservation(reservation: ReservationRequest): void {
    this.serviceService.reserveService(reservation, this.data.eventId, this.data.serviceId).subscribe({
      next: (_) => this.showMessage(MESSAGES.success, MESSAGES.reservationSuccess),
      error: (error) => this.handleError(error)
    });
  }

  private handleError(error: HttpErrorResponse): void {
    if (error.status >= 500)
      this.showMessage(ERROR_MESSAGES.GENERAL_ERROR , ERROR_MESSAGES.SERVER_ERROR)
    else 
      this.showMessage(ERROR_MESSAGES.GENERAL_ERROR, error.error.message)
  }

  showMessage(title: string, message: string) : void {
    this.dialog.open(InfoDialogComponent, {
      data: { title: title, message: message }
    })
  }
}