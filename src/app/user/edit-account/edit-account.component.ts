import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { City } from '../../shared/model/city.model';
import { SharedService } from '../../shared/shared.service';
import { UserService } from '../user.service';
import { AccountDetails } from '../model/account-details.model';
import { Person } from '../model/person.model';
import { HttpErrorResponse } from '@angular/common/http';
import { combineLatest } from 'rxjs';
import { InfoDialogComponent } from '../../shared/info-dialog/info-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ERROR_MESSAGES } from '../../shared/constants/error-messages';
import { MESSAGES } from '../../shared/constants/messages';
import { Router } from '@angular/router';
import { ChangePasswordDialogComponent } from '../change-password-dialog/change-password-dialog.component';
import { AuthService } from '../../auth/auth.service';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrl: './edit-account.component.css'
})
export class EditAccountComponent implements OnInit {
  updateForm: FormGroup;
  cities: City[];
  user: AccountDetails;
  profilePhoto: File | null = null;

  constructor(private fb: FormBuilder,
              private sharedService: SharedService,
              private service: UserService,
              private authService: AuthService,
              private dialog: MatDialog,
              private router: Router
  ) {
    this.updateForm = this.fb.group({
          name: ['', Validators.required],
          lastname: ['', Validators.required],
          address: ['', Validators.required],
          city: ['', Validators.required],
          phoneNumber: ['', [Validators.required, Validators.pattern('^(\\+)?[0-9]{9,15}$')]],
        });
  }

  ngOnInit(): void {
    combineLatest([
      this.sharedService.getCities(),
      this.service.getCurrentUser()
    ]).subscribe({
      next: ([cities, user]: [City[], AccountDetails]) => {
        this.cities = cities;
        this.user = user;
        this.fillForm();
        this.getProfilePhoto();
      },
      error: (_) => {
        this.showMessage(ERROR_MESSAGES.GENERAL_ERROR, "");
        this.router.navigate(['']);
      }
    });
  }

  private getProfilePhoto() : void {
    this.service.getProfilePhoto(this.user.id).subscribe({
      next: (blob: Blob) => {
        this.user.profilePhoto = URL.createObjectURL(blob);
      },
      error: (_) => {
        this.user.profilePhoto = null;
      }
    });
  }

  private fillForm() : void {
    const selectedCity = this.cities.find(city => city.id === this.user.city.id);
    this.updateForm.patchValue({
      name: this.user.name,
      lastname: this.user.lastname,
      address: this.user.address,
      city: selectedCity,
      phoneNumber: this.user.phoneNumber
    });
  }

  onSubmit() {
    if (this.updateForm.valid) {
      const person: Person = this.updateForm.value;
      this.service.update(person).subscribe({
        next: () => {
          if (this.profilePhoto) {
            this.service.updateProfilePhoto(this.profilePhoto).subscribe({
              error: (error : HttpErrorResponse) => {
                  this.showMessage(ERROR_MESSAGES.GENERAL_ERROR, error.message);
              }
            });
          }
          this.showMessage(MESSAGES.success, MESSAGES.accountUpdated);
        },
        error: (error : HttpErrorResponse) => {
          if (error.status == 400) {
              this.showMessage("", error.message);
          } else {
              this.showMessage(ERROR_MESSAGES.GENERAL_ERROR, ERROR_MESSAGES.SERVER_ERROR);
          }
        }
      })
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file : File = input.files[0];
      this.profilePhoto = file;
      this.user.profilePhoto = URL.createObjectURL(file); 
    }
  }

  changePassword(): void {
    this.dialog.open(ChangePasswordDialogComponent);
  }

  openDeactivateConfirmation(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          data: { message: MESSAGES.deactivateConfiramation }
        });

    this.handleDialogClose(dialogRef);
  }

  private handleDialogClose(dialogRef: MatDialogRef<ConfirmationDialogComponent>): void {
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed)
        this.deactivate();
    });
  }

  private deactivate(): void {
    this.service.deactivateAccount().subscribe({
    next: () => {
      this.showMessage(MESSAGES.success, MESSAGES.accountDeactivated);
      this.authService.logout();
      this.router.navigate([''])
    },
    error: (error: HttpErrorResponse) => this.handleError(error)
  })
  }

  handleError(error: HttpErrorResponse): void {
    if (error.status >= 500) 
      this.showMessage(ERROR_MESSAGES.GENERAL_ERROR, ERROR_MESSAGES.SERVER_ERROR);
    else
      this.showMessage(ERROR_MESSAGES.GENERAL_ERROR, error.error.message);
  }

  showMessage(title: string, message: string) : void {
    this.dialog.open(InfoDialogComponent, {
      data: { title: title, message: message }
    })
  }

}
