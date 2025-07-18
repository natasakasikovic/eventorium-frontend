import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from '../company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from '../../shared/model/city.model';
import { SharedService } from '../../shared/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../../shared/info-dialog/info-dialog.component';
import { MESSAGES } from '../../shared/constants/messages';
import { CompanyRequest } from '../model/company-request.model';
import { CompanyResponse } from '../model/company-response.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ERROR_MESSAGES } from '../../shared/constants/error-messages';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-company-register',
  templateUrl: './company-register.component.html',
  styleUrl: './company-register.component.css'
})
export class CompanyRegisterComponent implements OnInit, OnDestroy {
  images: File[] = [];
  imagePreviews: string[] = [];
  companyForm: FormGroup;
  cities: City[];
  providerId: number;

  constructor(private fb: FormBuilder,
              private companyService: CompanyService,
              private router: Router,
              private sharedService: SharedService,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.companyForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^\\+?[0-9]{10,15}$')]],
      description: ['', Validators.required],
      openingHours: ['', Validators.required],
      closingHours: ['', Validators.required]
    });

    this.getCities();
    this.loadParams();
  }

  private loadParams(): void {
    this.route.params.subscribe(params => {
      this.providerId = params['provider-id'] ?? null;
    });
  }

  onSubmit() {
    if (this.companyForm.invalid) return 

    const newCompany: CompanyRequest = this.companyForm.value;
    newCompany.providerId = this.providerId;
    this.companyService.createCompany(newCompany).subscribe({
      next: (response: CompanyResponse) => {
        if (this.images.length > 0) {
          this.companyService.uploadImages(response.id, this.images).subscribe({
            next: () => {
              if (this.authService.getUserId() != this.providerId)
                this.showActivationDialog();
              else
                this.router.navigate(['/'])
            },
            error: (error: HttpErrorResponse) => {
              this.handleError(error);
              this.showActivationDialog();
            }
          })
        } else {
          if (this.authService.getUserId() != this.providerId)
            this.showActivationDialog();
          else
            this.router.navigate(['/'])
        }
      },
      
      error: (error: HttpErrorResponse) => this.handleError(error)
    })
  }

  showMessage(title: string, message: string) : void {
    this.dialog.open(InfoDialogComponent, { data: { title: title, message: message } })
  }

  showActivationDialog(): void {
    this.showMessage(MESSAGES.accountActivation.title, MESSAGES.accountActivation.message);
    void this.router.navigate(['/']);
  }

  private handleError(error: HttpErrorResponse): void {
    if (error.status == 502 || error.status < 500)
      this.showMessage(ERROR_MESSAGES.GENERAL_ERROR, error.error.message)
    else
      this.showMessage(ERROR_MESSAGES.GENERAL_ERROR , ERROR_MESSAGES.SERVER_ERROR)
  }

  public get formControls() {
    return this.companyForm.controls;
  }

  onImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files) {
      const images = Array.from(input.files);
      const validImages = images.filter(image => image.type.startsWith('image/'));
      if (validImages.length > 0) {
        this.images.push(...validImages);
        this.imagePreviews.push(...validImages.map(image => URL.createObjectURL(image)));
      }
    }
  }

  deleteImage(index: number): void {
    this.images.splice(index, 1);
    this.imagePreviews.splice(index, 1);
  }

  getCities(): void {
    this.sharedService.getCities().subscribe(cities => this.cities = cities);
  }

  ngOnDestroy() {
    this.imagePreviews.forEach(url => {
      URL.revokeObjectURL(url);
    });
  }
}
