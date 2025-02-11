import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {ServiceService} from '../service.service';
import {Reservation} from '../model/reservation.model';
import {Status} from '../../category/model/status-enum-ts';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-manage-reservations',
  templateUrl: './manage-reservations.component.html',
  styleUrl: './manage-reservations.component.css'
})
export class ManageReservationsComponent implements OnInit, AfterViewInit {
  reservations: MatTableDataSource<Reservation> = new MatTableDataSource();
  displayedColumns: string[] = ['event', 'service', 'date', 'startingTime', 'endingTime', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: ServiceService) {
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
      next: (reservation: Reservation) => {
        console.log("Success")
      },
      error: (error: HttpErrorResponse) => {
        console.log("Error", error.error.message);
      }
    });
  }

  declineReservation(reservation: Reservation): void {
    this.service.updateReservation(reservation.id, Status.DECLINED).subscribe({
      next: (reservation: Reservation) => {
        console.log("Success")
      },
      error: (error: HttpErrorResponse) => {
        console.log("Error", error.error.message);
      }
    });
  }
}
