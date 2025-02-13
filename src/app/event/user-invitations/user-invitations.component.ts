import { Component, OnInit } from '@angular/core';
import { InvitationDetails } from '../model/invitation-details.model';
import { EventService } from '../event.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ERROR_MESSAGES } from '../../shared/constants/error-messages';
import { InfoDialogComponent } from '../../shared/info-dialog/info-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-invitations',
  templateUrl: './user-invitations.component.html',
  styleUrl: './user-invitations.component.css'
})
export class UserInvitationsComponent implements OnInit {
  invitations: InvitationDetails[] = [];

  constructor(
    private service: EventService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.service.getInvitations().subscribe({
      next: (invitations: InvitationDetails[]) => {
        this.invitations = invitations;
      }, 
      error: (error: HttpErrorResponse) => {
        this.handleError(error);
      }
    })
  }

  private handleError(error: HttpErrorResponse): void {
    if (error.status == 502 || error.status < 500)
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
