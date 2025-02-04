import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuickRegistrationDto } from '../model/quick-registration.model';
import { AuthService } from '../auth.service';
import { QuickRegistrationPersonDto } from '../model/qucik-registration-person.model';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';
import { InfoDialogComponent } from '../../shared/info-dialog/info-dialog.component';
import { MESSAGES } from '../../shared/constants/messages';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../event/event.service';
import { InvitationResponse } from '../../event/model/invitation-response.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ERROR_MESSAGES } from '../../shared/constants/error-messages';
import { SharedService } from '../../shared/shared.service';
import { City } from '../../shared/model/city.model';
import { passwordMatchValidator } from '../../shared/validators/password-match.validator';

@Component({
  selector: 'app-quick-registration',
  templateUrl: './quick-registration.component.html',
  styleUrl: './quick-registration.component.css'
})
export class QuickRegistrationComponent implements OnInit {

  registrationForm: FormGroup;
  email: string;
  cities: City[];

  constructor(private fb: FormBuilder,
      private service: AuthService,
      private eventService: EventService,
      private dialog: MatDialog,
      private router: Router,
      private route: ActivatedRoute,
      private sharedService: SharedService) 
      {
      this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirmation: ['', Validators.required],
      city: ['', Validators.required]
    },
    { validators : passwordMatchValidator() })
  }

  ngOnInit(): void {
    this.getCities();
    this.getInvitationDetails();
  }

  getInvitationDetails(): void {
    this.route.params.pipe(
      switchMap(param => {
        const hash: string = param['hash'];
        return this.eventService.getInvitation(hash);
      })
    ).subscribe({
      next: (response: InvitationResponse) => this.email = response.email,
      error: (error) => this.handleInvitationError(error)
    });
  }

  private handleInvitationError(error: HttpErrorResponse): void {
    if (error.status < 500) {
      this.showMessage(MESSAGES.alreadyRegistered, error.error.message);
      void this.router.navigate(['login']);
    } 
    else
      this.showMessage(ERROR_MESSAGES.GENERAL_ERROR, ERROR_MESSAGES.SERVER_ERROR);
  }

  getCities(): void {
    this.sharedService.getCities().subscribe(cities => this.cities = cities);
  }

  processRegistration() {
    if (this.registrationForm.invalid)
      return;

    const user = this.getFormValues()

    this.service.quickRegister(user).pipe(
      tap(() => this.handleRegistrationSuccess()),
      catchError((error: HttpErrorResponse) => this.handleRegistrationError(error))
    ).subscribe();
  }

  private handleRegistrationSuccess(): void {
    const message = MESSAGES.quickRegistrationSuccess;
    this.showMessage(message.title, message.message);
    this.router.navigate(['/']);
  }
  
  private handleRegistrationError(error: HttpErrorResponse): Observable<null> {
    if (error.status < 500) 
      this.showMessage(ERROR_MESSAGES.GENERAL_ERROR, error.error.message);
    else
      this.showMessage(ERROR_MESSAGES.GENERAL_ERROR, ERROR_MESSAGES.SERVER_ERROR);
      
    return of(null);
  }

  showMessage(title: string, message: string) : void {
    this.dialog.open(InfoDialogComponent, {
      data: { title: title, message: message }
    })
  }

  getFormValues(): QuickRegistrationDto {
    const formValue = this.registrationForm.value;

    const person : QuickRegistrationPersonDto = {
      name: formValue.firstName,
      lastname: formValue.lastName,
      city: formValue.city ? formValue.city : null
      }

    const user: QuickRegistrationDto = {
      email: this.email,
      password: formValue.password,
      passwordConfirmation: formValue.passwordConfirmation,
      person: person
    };

    return user;
  }
}
