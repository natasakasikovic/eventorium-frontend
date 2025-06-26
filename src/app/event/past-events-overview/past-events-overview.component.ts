import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../../shared/info-dialog/info-dialog.component';
import { ERROR_MESSAGES } from '../../shared/constants/error-messages';
import { EventTable } from '../model/event-table.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-past-events-overview',
  templateUrl: './past-events-overview.component.html',
  styleUrl: './past-events-overview.component.css'
})
export class PastEventsOverviewComponent implements OnInit {
  events: EventTable[];

  displayedColumns: string[] = [
    'name',
    'date',
    'privacy',
    'maxParticipants',
    'city',
    'actions'
  ];

  constructor(
    private service: EventService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
      this.loadEvents();
  }

  private loadEvents() : void {
    this.service.getPassedEvents().subscribe({
      next: (events: EventTable[]) => this.events = events,
      error: (error: HttpErrorResponse) => this.handleError(error)
    })
  } 

  viewStats(id: number): void {
    void this.router.navigate(['/event-stats', id]);
  }

  exportStats(id: number): void {
    this.service.exportEventStatisticsToPdf(id).subscribe({
      next: (blob: Blob) => {
        const fileURL = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = fileURL;
        link.download = "event-stats.pdf";
        link.click();
      },
      error: (error: HttpErrorResponse) => {
        this.handleError(error);
      }
    })
  }

  handleError(error: HttpErrorResponse): void {
    if (error.status < 500)
      this.showMessage(ERROR_MESSAGES.GENERAL_ERROR, error.error.message)
    else
      this.showMessage(ERROR_MESSAGES.GENERAL_ERROR , ERROR_MESSAGES.SERVER_ERROR)      
  }

  showMessage(title: string, message: string) : void {
    this.dialog.open(InfoDialogComponent, {
      data: { title: title, message: message }
    })
  }
}
