import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { City } from '../../shared/model/city.model';
import { MatDialog } from '@angular/material/dialog';
import { SharedService } from '../../shared/shared.service';
import { Router } from '@angular/router';
import { CompanyService } from '../company.service';
import { ProviderCompany } from '../model/provider-company.model';
import { ImageResponseDto } from '../../shared/model/image-response-dto.model';
import { switchMap } from 'rxjs';
import { InfoDialogComponent } from '../../shared/info-dialog/info-dialog.component';
import { ERROR_MESSAGES } from '../../shared/constants/error-messages';
import { MESSAGES } from '../../shared/constants/messages';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrl: './edit-company.component.css'
})
export class EditCompanyComponent implements OnInit {
  images: File[] = []; 
  imagePreviews: string[] = [];
  companyForm: FormGroup;
  cities: City[];
  company: ProviderCompany;

  
  constructor(private fb: FormBuilder, 
              private service: CompanyService,   
              private router: Router,
              private sharedService: SharedService,
              private dialog: MatDialog)
  {
    this.companyForm = this.fb.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^\\+?[0-9]{10,15}$')]],
      description: ['', Validators.required],
      openingHours: ['', Validators.required],
      closingHours: ['', Validators.required]
    });
  }

  ngOnInit(): void {
      this.service.getCompany().pipe(
        switchMap((company: ProviderCompany) => {
            this.company = company;
            this.loadCitiesAndFillForm();
            return this.service.getImages(company.id);
          })
        ).subscribe({
        next: (images : ImageResponseDto[]) => {
          this.company.images = images.map(image =>
            `data:${image.contentType};base64,${image.data}`
          );
        },
        error: (_) => {
          this.showMessage(ERROR_MESSAGES.GENERAL_ERROR, "");
        }
      })
  }

  loadCitiesAndFillForm(): void {
    this.sharedService.getCities().subscribe({
      next: (cities: City[]) => {
        this.cities = cities;
        this.fillForm();
      }
    });
  }

  showMessage(title: string, message: string) : void {
    this.dialog.open(InfoDialogComponent, {
      data: {
        title: title,
        message: message
      }
    })
  }

  fillForm(): void {
    const selectedCity = this.cities.find(city => city.id === this.company.city.id);
    this.companyForm.patchValue({
      address: this.company.address,
      description: this.company.description,
      phoneNumber: this.company.phoneNumber,
      city: selectedCity,
      openingHours: this.company.openingHours,
      closingHours: this.company.closingHours
    })
  }

  onSubmit(): void {
    if (this.companyForm.valid) {
        const updatedCompany: ProviderCompany = this.companyForm.value;
        updatedCompany.id = this.company.id;
        this.service.updateCompany(updatedCompany).subscribe({
          next: () => {
            this.showMessage(MESSAGES.success, MESSAGES.companyUpdated);
          },
          error: (_) => {
            this.showMessage(ERROR_MESSAGES.GENERAL_ERROR, "");
          }
        })
    }
  }

  onImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files) {
      const images = Array.from(input.files);
      const validImages = images.filter(image => image.type.startsWith('image/'));
      if (validImages.length > 0) {
        this.images = validImages;
        this.company.images = validImages.map(image => URL.createObjectURL(image));
      }
    }
  }

  deleteImage(index: number): void {
    this.images.splice(index, 1);
    this.company.images.splice(index, 1); 
  }
}
