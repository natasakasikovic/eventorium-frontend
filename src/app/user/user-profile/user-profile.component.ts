import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountDetails } from '../model/account-details.model';
import { UserService } from '../user.service';
import { ERROR_MESSAGES } from '../../shared/constants/error-messages';
import { InfoDialogComponent } from '../../shared/info-dialog/info-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ReportUserDialogComponent } from '../report-user-dialog/report-user-dialog.component';
import { UserReport } from '../model/user-report.model';
import { MESSAGES } from '../../shared/constants/messages';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  id: number | null;
  user: AccountDetails;

  constructor(
    private route: ActivatedRoute,
    private service: UserService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadParams();
    this.service.getUser(this.id).subscribe({
      next: (user: AccountDetails) => {
        this.user = user;
        this.service.getProfilePhoto(user.id).subscribe({
          next: (blob: Blob) => {
            this.user.profilePhoto = URL.createObjectURL(blob);
          }, 
          error: (_) => {
            this.user.profilePhoto = null;
          }
        })
      },
      error: (_) => {
        this.showMessage(ERROR_MESSAGES.GENERAL_ERROR, "");
      }
    })
  }   

  private loadParams(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'] ?? null;
    });
  }

  openReportDialog(): void {
    let dialog = this.dialog.open(ReportUserDialogComponent, {
      height: '300px',
      width: '400px',
    });

    this.handleDialogClose(dialog)
  }

  private handleDialogClose(dialogRef: MatDialogRef<ReportUserDialogComponent>): void {
    dialogRef.afterClosed().subscribe((report: UserReport) => {
      if (report)
        this.reportUser(report);
    });
  }

  private reportUser(report: UserReport) {
    this.service.reportUser(report, this.id).subscribe({
      next: (_) => {
        this.showMessage(MESSAGES.success, MESSAGES.reportSubmitted);
      },
      error: (error) => {
        if (error.status === 400)
          this.showMessage(ERROR_MESSAGES.GENERAL_ERROR, error.error.message);
        else
          this.showMessage(ERROR_MESSAGES.GENERAL_ERROR, ERROR_MESSAGES.SERVER_ERROR);
      }
    })
  }

  blockUser(): void {
    // TODO
  }

  showMessage(title: string, message: string) : void {
    this.dialog.open(InfoDialogComponent, {
      data: {
        title: title,
        message: message
      }
    })
  }
}
