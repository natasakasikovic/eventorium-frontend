import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuickRegistrationDto } from '../model/quick-registration.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-quick-registration',
  templateUrl: './quick-registration.component.html',
  styleUrl: './quick-registration.component.css'
})
export class QuickRegistrationComponent {

  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private service: AuthService) {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },
    { Validators : this.passwordMatchValidator })
  }

  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  processRegistration() {
    if (this.registrationForm.invalid)
      return;

    const user: QuickRegistrationDto = {
      person: {
        name: this.registrationForm.get('firstName').value,
        lastname: this.registrationForm.get('lastName').value
      },
      email: "TODO@gmail.com",  // TODO: get an email when invitation is verificated
      password: this.registrationForm.get('password').value,
      passwordConfirmation: this.registrationForm.get('confirmPassword').value
    };

    this.service.quickRegister(user).subscribe({
        // TODO: implement pop up with messages
    })
  }

}
