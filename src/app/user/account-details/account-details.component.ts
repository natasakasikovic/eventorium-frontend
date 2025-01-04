import { Component, OnInit } from '@angular/core';
import { AccountDetails } from '../model/account-details.model';
import { UserService } from '../user.service';
import { InfoDialogComponent } from '../../shared/info-dialog/info-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ERROR_MESSAGES } from '../../shared/constants/error-messages';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrl: './account-details.component.css'
})
export class AccountDetailsComponent implements OnInit {

  user: AccountDetails;

  constructor(private service: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.service.getCurrentUser().subscribe({
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
  

  showMessage(title: string, message: string) : void {
    this.dialog.open(InfoDialogComponent, {
      data: {
        title: title,
        message: message
      }
    })
  }
}
