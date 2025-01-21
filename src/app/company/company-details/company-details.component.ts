import { Component, OnInit } from '@angular/core';
import { CompanyDetails } from '../model/company-details.model';
import { CompanyService } from '../company.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { InfoDialogComponent } from '../../shared/info-dialog/info-dialog.component';
import { switchMap } from 'rxjs';
import { ImageResponseDto } from '../../shared/model/image-response-dto.model';
import { ERROR_MESSAGES } from '../../shared/constants/error-messages';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrl: './company-details.component.css'
})
export class CompanyDetailsComponent implements OnInit {
  id: number;
  company: CompanyDetails;

  constructor(
    private service: CompanyService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.loadCompany();
  }

  loadCompany(): void {
    this.service.getCompanyDetails(this.id).pipe(
      switchMap((company: CompanyDetails) => {
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

  comment() {
    // TODO: If company commenting is not needed, delete this
  }
}
