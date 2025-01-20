import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../event.service';
import { EventDetails } from '../model/event-details.model';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../../shared/info-dialog/info-dialog.component';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})
export class EventDetailsComponent implements OnInit {

  id: number;
  event: EventDetails;

  constructor(
    private route: ActivatedRoute,
    private service: EventService,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.service.getEvent(this.id).subscribe({
      next: (event: EventDetails) => {
        this.event = event;
      },
      error: (_) => {
        this.showMessage("", "An error ocured while loading event details. Try again later.");
      }
    })
  }

  showMessage(title: string, message: string) : void {
    this.dialog.open(InfoDialogComponent, {
      data: {
        title: title,
        message: message
      }
    })
  }

  get loggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

}
