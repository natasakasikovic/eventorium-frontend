import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { User } from '../model/user.model';
import { UserRole } from '../model/user-role.enum';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../../shared/info-dialog/info-dialog.component';
import { MESSAGES } from '../../shared/constants/messages';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent {
  user: User | null;
  registrationForm: FormGroup;
  userRoles = [UserRole.EVENT_ORGANIZER, UserRole.PROVIDER];
  selectedFile: File | null = null;
  imageUrl: string | undefined = undefined;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router, 
    private dialog: MatDialog) {

    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
    }, { validator: passwordMatchValidator() });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.user = this.registrationForm.value;
      this.user.activated = false;
      // this.authService.add(this.user);
      this.showActivationDialog();
    }
  }

  uploadFile() {
    const fileInput: HTMLElement = document.getElementById('fileInput')!;
    fileInput.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      console.log('Selected file:', file.name);
      this.selectedFile = file; 

      this.imageUrl = URL.createObjectURL(file); 
    }
  }

  showActivationDialog(): void {
    if (this.user.role == UserRole.PROVIDER) {
      this.router.navigate(['/company-register']);
      return;
    }

    this.dialog.open(InfoDialogComponent, {
      data: { 
        title: MESSAGES.accountActivation.title, 
        message: MESSAGES.accountActivation.message }
    });
    
    this.router.navigate(['/']);
  }
}  

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return password && confirmPassword && password !== confirmPassword
      ? { passwordMismatch: true }
      : null;
  };
}
