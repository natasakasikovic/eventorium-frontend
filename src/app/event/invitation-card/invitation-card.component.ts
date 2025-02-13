import { Component, Input } from '@angular/core';
import { InvitationDetails } from '../model/invitation-details.model';
import { EventService } from '../event.service';
import { MESSAGES } from '../../shared/constants/messages';
import { HttpErrorResponse } from '@angular/common/http';
import { InfoDialogComponent } from '../../shared/info-dialog/info-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ERROR_MESSAGES } from '../../shared/constants/error-messages';

@Component({
  selector: 'app-invitation-card',
  templateUrl: './invitation-card.component.html',
  styleUrl: './invitation-card.component.css'
})
export class InvitationCardComponent {
  @Input() invitation: InvitationDetails;

  constructor(
    private service: EventService,
    private dialog: MatDialog
  ) {}

  addToCalendar(event: MouseEvent, invitation: InvitationDetails): void {
    event.stopPropagation();
    this.service.addToCalendar(invitation.eventId).subscribe({
      next: (_) => {
        this.showMessage(MESSAGES.success, MESSAGES.addedToCalendar);
      }, error: (error: HttpErrorResponse) => {
        this.handleError(error);
      }
    })
  }

  showMessage(title: string, message: string) : void {
    this.dialog.open(InfoDialogComponent, {
      data: { title: title, message: message }
    })
  }

  private handleError(error: HttpErrorResponse): void {
    if (error.status == 502 || error.status < 500)
      this.showMessage(ERROR_MESSAGES.GENERAL_ERROR, error.error.message)
    else
      this.showMessage(ERROR_MESSAGES.GENERAL_ERROR , ERROR_MESSAGES.SERVER_ERROR)      
  }
}
