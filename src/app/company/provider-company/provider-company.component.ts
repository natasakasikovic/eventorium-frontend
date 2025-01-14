import { Component, OnInit } from '@angular/core';
import { ProviderCompany } from '../model/provider-company.model';
import { CompanyService } from '../company.service';
import { InfoDialogComponent } from '../../shared/info-dialog/info-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ERROR_MESSAGES } from '../../shared/constants/error-messages';
import { switchMap } from 'rxjs';
import { ImageResponseDto } from '../../shared/model/image-response-dto.model';

@Component({
  selector: 'app-provider-company',
  templateUrl: './provider-company.component.html',
  styleUrl: './provider-company.component.css'
})
export class ProviderCompanyComponent implements OnInit {
  
  company: ProviderCompany;

  constructor(
    private service: CompanyService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.service.getCompany().pipe(
      switchMap((company: ProviderCompany) => {
        this.company = company;
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

  showMessage(title: string, message: string) : void {
    this.dialog.open(InfoDialogComponent, {
      data: {
        title: title,
        message: message
      }
    })
  }

  edit(): void {
    
  }
}
