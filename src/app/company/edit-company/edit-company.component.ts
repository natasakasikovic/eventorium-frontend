import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { RemoveImageRequest } from '../../shared/model/remove-image-request.model';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrl: './edit-company.component.css'
})
export class EditCompanyComponent implements OnInit, OnDestroy {
  companyForm: FormGroup;
  cities: City[];
  company: ProviderCompany;
  existingImages: number[] = [];
  existingImagesPreview: string[] = [];
  removedImages: RemoveImageRequest[] = [];
  newImages: File[] = [];
  newImagesPreview: string[] = [];
  
  constructor(private fb: FormBuilder, 
              private service: CompanyService,   
              private router: Router,
              private sharedService: SharedService,
              private dialog: MatDialog)
  {
    this.companyForm = this.fb.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^\\+?[0-9]{9,15}$')]],
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
          this.existingImagesPreview = images.map(image =>
            `data:${image.contentType};base64,${image.data}`
          );
          this.existingImages = images.map(image => image.id);
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

  showMessage(title: string, message: string) : void {
    this.dialog.open(InfoDialogComponent, {
      data: {
        title: title,
        message: message
      }
    })
  }

  onSubmit(): void {
    if (this.companyForm.valid) {
        const updatedCompany: ProviderCompany = this.companyForm.value;
        updatedCompany.id = this.company.id;
        this.service.updateCompany(updatedCompany).subscribe({
          next: () => {
            this.showMessage(MESSAGES.success, MESSAGES.companyUpdated);
            this.removeImages();
            this.uploadNewImages();
            if (this.newImages.length == 0) this.router.navigate(['provider-company']);
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
        this.newImagesPreview.push(...validImages.map(image => URL.createObjectURL(image)));
        this.newImages = validImages;
      }
    }
  }

  removeExistingImage(index: number): void {
    this.existingImagesPreview.splice(index, 1);
    const removed = this.existingImages.splice(index, 1);
    const request: RemoveImageRequest = {
      id: removed[0]
    }
    this.removedImages.push(request);
  }

  removeNewImage(index: number): void {
    this.newImages.splice(index, 1);
    this.newImagesPreview.splice(index, 1);
  }

  uploadNewImages(): void {
    if (this.newImages.length == 0) return;
    this.service.uploadImages(this.company.id, this.newImages).subscribe({ 
      next: (_) => {
        this.router.navigate(['provider-company']);
      }, 
      error: (_) => {
        this.showMessage(ERROR_MESSAGES.GENERAL_ERROR, ERROR_MESSAGES.IMAGE_UPLOAD_ERROR);
      }
    })
  }

  removeImages(): void {
    if (this.removedImages.length == 0) return;
    this.service.removeImages(this.removedImages).subscribe();
  }

  ngOnDestroy() {
    this.newImagesPreview.forEach(url => {
      URL.revokeObjectURL(url);
    });
  }
}
