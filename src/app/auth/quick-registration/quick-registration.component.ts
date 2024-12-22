import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuickRegistrationDto } from '../model/quick-registration.model';
import { AuthService } from '../auth.service';
import { QuickRegistrationPersonDto } from '../model/qucik-registration-person.model';
import { MatDialog } from '@angular/material/dialog';
import { catchError, switchMap, tap } from 'rxjs';
import { InfoDialogComponent } from '../../shared/info-dialog/info-dialog.component';
import { MESSAGES } from '../../shared/constants/messages';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { EventService } from '../../event/event.service';
import { InvitationResponse } from '../../event/model/invitation-response.model';

@Component({
  selector: 'app-quick-registration',
  templateUrl: './quick-registration.component.html',
  styleUrl: './quick-registration.component.css'
})
export class QuickRegistrationComponent implements OnInit {

  registrationForm: FormGroup;
  email: string;

  constructor(private fb: FormBuilder,
      private service: AuthService,
      private eventService: EventService,
      private dialog: MatDialog,
      private router: Router,
      private route: ActivatedRoute,
       ) {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },
    { Validators : this.passwordMatchValidator })
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(param => {
        const hash: string = param['hash'];
        return this.eventService.getInvitation(hash);
      })
    ).subscribe({
      next: (response: InvitationResponse) => {
        this.email = response.email;
      }
    });
  }


  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  processRegistration() {
    if (this.registrationForm.invalid)
      return;

    const user = this.getFormValues()

    this.service.quickRegister(user).pipe(
      
      tap(() => {
        const message = MESSAGES.quickRegistrationSuccess;
        this.showMessage(message.title, message.message)
        this.router.navigate(['/'])
      })
      // TODO: add catchError
    ).subscribe();
  }

  showMessage(title: string, message: string) : void {
    this.dialog.open(InfoDialogComponent, {
      data: {
        title: title,
        message: message
      }
    })
  }

  getFormValues(): QuickRegistrationDto {
    const formValue = this.registrationForm.value;

    const person : QuickRegistrationPersonDto = {
      name: formValue.firstName,
      lastname: formValue.lastName
    }

    const user: QuickRegistrationDto = {
      email: this.email,
      password: formValue.password,
      passwordConfirmation: formValue.confirmPassword,
      person: person
    };

    return user;
  }

}
