import {Component, OnInit} from '@angular/core';
import {ServiceService} from '../service.service';
import {Service} from '../model/service.model';
import {PageEvent} from '@angular/material/paginator';
import {PagedResponse} from '../../shared/model/paged-response.model';
import {PageProperties} from '../../shared/model/page-properties.model';
import {ToastrService} from 'ngx-toastr';
import {HttpErrorResponse} from '@angular/common/http';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ServicesFilterDialogComponent} from '../services-filter-dialog/services-filter-dialog.component';
import {ERROR_MESSAGES} from '../../shared/constants/error-messages';
import {InfoDialogComponent} from '../../shared/info-dialog/info-dialog.component';
import {ServiceFilter} from '../model/service-filter.model';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import {MESSAGES} from '../../shared/constants/messages';

@Component({
  selector: 'app-manageable-services',
  templateUrl: './manageable-services.component.html',
  styleUrl: './manageable-services.component.css'
})
export class ManageableServicesComponent implements OnInit {
  services: Service[];

  constructor(
    private service: ServiceService,
    private toasterService: ToastrService,
    private dialog: MatDialog
  ) {
  }

  pageProperties: PageProperties = {
    pageIndex: 0,
    pageSize: 10,
    totalCount: 0
  }

  activeFilter?: ServiceFilter = null;
  keyword: string = "";

  ngOnInit(): void {
    this.getPagedServices();
  }

  onPageChanged(pageEvent : PageEvent): void {
    this.pageProperties.pageIndex = pageEvent.pageIndex;
    this.pageProperties.pageSize = pageEvent.pageSize;

    if (this.keyword)
      this.onSearch(this.keyword)
    else if (this.activeFilter)
      this.filterServices(this.activeFilter)
    else
      this.getPagedServices();
  }

  openDialog() {
    let dialog = this.dialog.open(ServicesFilterDialogComponent, {
      height: '510px',
      width: '600px',
    });

    this.handleFilterDialogClose(dialog);
  }

  showMessage(title: string, message: string) : void {
    this.dialog.open(InfoDialogComponent, {
      data: {
        title: title,
        message: message
      }
    });
  }

  filterServices(filter: ServiceFilter) {
    this.preprocessFilter(filter);
    this.service.filterProviderServices(filter, this.pageProperties).subscribe({
      next: (response: PagedResponse<Service>) => {
        this.services = response.content;
        this.pageProperties.totalCount = response.totalElements;
      },
      error: (err) => {
        if (err.status == 400)
          this.showMessage(ERROR_MESSAGES.GENERAL_ERROR, err.error.message)
        else
          this.showMessage(ERROR_MESSAGES.GENERAL_ERROR, ERROR_MESSAGES.SERVER_ERROR)
      }
    })
  }

  onSearch(keyword: string): void {
    this.resetPageIndex(keyword, null);
    this.keyword = keyword;
    this.service.searchProviderServices(keyword, this.pageProperties).subscribe({
      next: (response: PagedResponse<Service>) => {
        this.services = response.content;
        this.pageProperties.totalCount = response.totalElements;
      }
    });
  }

  openDeleteConfirmation(service: Service): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: MESSAGES.deleteConfirmation + " " + service.name + "?"}
    });


    this.handleConfirmationDialogClose(dialogRef, service)
  }

  private handleConfirmationDialogClose(dialogRef: MatDialogRef<ConfirmationDialogComponent>, service: Service){
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed)
        this.deleteService(service);
    });
  }

  private getPagedServices() {
    this.service.getAllForProvider(this.pageProperties, this.activeFilter).subscribe({
      next: (response: PagedResponse<Service>) => {
        this.services = response.content;
        this.pageProperties.totalCount = response.totalElements;
      }
    })
  }

  private preprocessFilter(filter: ServiceFilter){
    this.resetPageIndex(null, filter);
    this.activeFilter = filter;
    this.keyword = null;
  }

  private resetPageIndex(keyword: string | null, filter: ServiceFilter | null): void {
    if ((keyword && this.keyword != keyword) || (filter && this.activeFilter !== filter) && this.pageProperties.pageIndex != 0)
      this.pageProperties.pageIndex = 0;
  }

  private handleFilterDialogClose(dialogRef: MatDialogRef<ServicesFilterDialogComponent>): void {
    dialogRef.afterClosed().subscribe((filter: ServiceFilter) => {
      this.filterServices(filter);
    });
  }

  private deleteService(service: Service) {
    this.service.delete(service.id).subscribe({
      next: () => {
        this.toasterService.success(`${service.name} has been deleted successfully!`, "Success");
        this.services = this.services.filter(s => s.id !== service.id);
      },
      error: (error: HttpErrorResponse) => {
        this.toasterService.success(error.error.message, "Failed to delete service");
      }
    });
  }
}
