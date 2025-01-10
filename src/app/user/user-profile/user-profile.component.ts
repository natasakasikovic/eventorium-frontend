import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountDetails } from '../model/account-details.model';
import { UserService } from '../user.service';
import { ERROR_MESSAGES } from '../../shared/constants/error-messages';
import { InfoDialogComponent } from '../../shared/info-dialog/info-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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

  reportUser(): void {
    
  }

  blockUser(): void {
    
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
