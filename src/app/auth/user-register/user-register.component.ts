import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../../shared/info-dialog/info-dialog.component';
import { MESSAGES } from '../../shared/constants/messages';
import { ERROR_MESSAGES } from '../../shared/constants/error-messages';
import { City } from '../../shared/model/city.model';
import { SharedService } from '../../shared/shared.service';
import { Role } from '../model/user-role.model';
import { AuthRequestDto } from '../model/auth-request.model';
import { PersonRequestDto } from '../model/person.request.model';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthResponse } from '../model/auth-response.model';
import { toString } from '../model/user-role.model';
import { passwordMatchValidator } from '../../shared/validators/password-match.validator';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent {
  user: AuthRequestDto | null;
  registrationForm: FormGroup;
  userRoles: Role[];
  profilePhoto: File | null = null;
  imageUrl: string | null = null;
  cities: City[];
  roles: Role[];
  userId: number;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private sharedService: SharedService,
    private router: Router, 
    private dialog: MatDialog) {

    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^(\\+)?[0-9]{9,15}$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirmation: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
    }, 
    { 
      validators: passwordMatchValidator(),
      updateOn: 'change'
    }
  );

    this.getCities();
    this.getRoles();
  }
  
  onSubmit() {
    if (this.registrationForm.valid) {
      const newUser = this.getFormValues();
      this.user = newUser;
      this.authService.registerUser(newUser).subscribe({
        next: (response: AuthResponse) => {
          if (response) this.userId = response.id
          
          if (response && this.profilePhoto) {
            this.authService.uploadProfilePhoto(response.id, this.profilePhoto).subscribe({
              next: () => {
                this.nextStep();
              },
              error: (error: HttpErrorResponse) => {
                this.showMessage(ERROR_MESSAGES.GENERAL_ERROR, ERROR_MESSAGES.PROFILE_PHOTO_UPLOAD_ERROR);
              }
            })
          } else this.nextStep();
        },
        error: (error: HttpErrorResponse) => {
          this.handleError(error);
        }
      })
    }
  }

  private handleError(error: HttpErrorResponse): void {
    if (error.status == 502 || error.status < 500)
      this.showMessage(ERROR_MESSAGES.GENERAL_ERROR, error.error.message)
    else
      this.showMessage(ERROR_MESSAGES.GENERAL_ERROR , ERROR_MESSAGES.SERVER_ERROR)      
  }
  
  nextStep(): void {
    if (this.user.roles[0].name.toUpperCase() === "PROVIDER") 
      void this.router.navigate([`${this.userId}/company-register`]);
    else {
      this.showMessage(MESSAGES.accountActivation.title, MESSAGES.accountActivation.message);
      void this.router.navigate(['/']);
    }
  }

  showMessage(title: string, message: string) : void {
    this.dialog.open(InfoDialogComponent, {
      data: {
        title: title,
        message: message
      }
    })
  }
  
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file : File = input.files[0];
      this.profilePhoto = file; 
      this.imageUrl = URL.createObjectURL(file); 
    }
  }

  getCities(): void {
    this.sharedService.getCities().subscribe(cities => this.cities = cities);
  }

  getRoles(): void {
    this.authService.getRegistrationOptions().subscribe(roles => this.roles = roles);
  }

  getFormValues(): AuthRequestDto {
    const formValue = this.registrationForm.value;
  
    const newPerson: PersonRequestDto = {
      name : formValue.name,
      lastname : formValue.lastname,
      phoneNumber : formValue.phoneNumber,
      address : formValue.address,
      city : formValue.city,
      profilePhoto: null
    };

    const newUser: AuthRequestDto = {
      email : formValue.email,
      password : formValue.password,
      passwordConfirmation : formValue.passwordConfirmation,
      roles : [formValue.role],
      person : newPerson
    };

    return newUser;
  }

  roleToString(role: Role): string {
    return toString(role);
  }

}  
