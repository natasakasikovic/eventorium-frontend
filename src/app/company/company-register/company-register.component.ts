import { Component } from '@angular/core';
import { CompanyModule } from '../company.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company } from '../model/company.model';
import { CompanyService } from '../company.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-register',
  templateUrl: './company-register.component.html',
  styleUrl: './company-register.component.css'
})
export class CompanyRegisterComponent {
  images: string[] = []; 
  companyForm: FormGroup;

  constructor(private fb: FormBuilder, private companyService: CompanyService, private router: Router) {
    this.companyForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      phone_number: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      description: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.companyForm.valid) {
      const newCompany: Company = this.companyForm.value;
      // this.companyService.add(newCompany); // NOTE
      
      // NOTE: This will be changed to avoid using 'alert' in the future.
      alert(`Account Activation Required
          Thank you for signing up!
          
          To complete your registration, please follow these steps:
          
          1. Check your email: We've sent an activation link to the email address you provided.
          2. Activate your account: Click the link within 24 hours to confirm your email and activate your account.
          
          Important: Your activation link will expire after 24 hours. If you do not activate your account within this time, you will need to repeat the registration process.
          
          Thank you for choosing Eventorium!`);
          
      this.router.navigate(['/']);
    
    }
  }

  get formControls() {
    return this.companyForm.controls;
  }

  onImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement; 
    const files = input.files; 
  
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          const result = e.target?.result as string; 
          this.images.push(result); 
        };
        reader.readAsDataURL(files[i]); 
      }
    }
  }

  deleteImage(index: number): void {
    this.images.splice(index, 1); 
  }
}
