import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {ServiceService} from '../service.service';
import {Reservation} from '../model/reservation.model';
import {Status} from '../../category/model/status-enum-ts';
import {HttpErrorResponse} from '@angular/common/http';
import {ERROR_MESSAGES} from '../../shared/constants/error-messages';
import {InfoDialogComponent} from '../../shared/info-dialog/info-dialog.component';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-manage-reservations',
  templateUrl: './manage-reservations.component.html',
  styleUrl: './manage-reservations.component.css'
})
export class ManageReservationsComponent implements OnInit, AfterViewInit {
  reservations: MatTableDataSource<Reservation> = new MatTableDataSource();
  displayedColumns: string[] = ['event', 'service', 'date', 'startingTime', 'endingTime', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: ServiceService, private toasterService: ToastrService) {
  }

  ngOnInit(): void {
    this.service.getPendingReservations().subscribe({
      next: (reservations: Reservation[]) => {
        this.reservations.data = reservations;
      }
    });
  }

  ngAfterViewInit(): void {
    this.reservations.paginator = this.paginator;
  }

  acceptReservation(reservation: Reservation): void {
    this.service.updateReservation(reservation.id, Status.ACCEPTED).subscribe({
      next: () => {
        this.toasterService.success("Successfully accepted reservation", "Success");
        this.reservations.data = this.reservations.data.filter(res => res.id !== reservation.id);
      },
      error: (error: HttpErrorResponse) => this.handleError(error)
    });
  }

  declineReservation(reservation: Reservation): void {
    this.service.updateReservation(reservation.id, Status.DECLINED).subscribe({
      next: () => {
        this.toasterService.success("Successfully declined reservation", "Success");
        this.reservations.data = this.reservations.data.filter(res => res.id !== reservation.id);
      },
      error: (error: HttpErrorResponse) => this.handleError(error)
    });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status > 500)
      this.toasterService.error(ERROR_MESSAGES.GENERAL_ERROR, ERROR_MESSAGES.SERVER_ERROR)
    else
      this.toasterService.error(ERROR_MESSAGES.GENERAL_ERROR, error.error.message)
  }
}
