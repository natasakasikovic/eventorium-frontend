import {Component, OnInit, ViewChild} from '@angular/core';
import {ServiceService} from '../service.service';
import {Service} from '../model/service.model';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {ServiceFilter} from '../model/filter-service-options.model';
import {PagedResponse} from '../../shared/model/paged-response.model';
import {PageProperties} from '../../shared/model/page-properties.model';
import {ToastrService} from 'ngx-toastr';
import {HttpErrorResponse} from '@angular/common/http';
import {Category} from '../../category/model/category.model';
import {DeleteConfirmationComponent} from '../../shared/delete-confirmation/delete-confirmation.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-manageable-services',
  templateUrl: './manageable-services.component.html',
  styleUrl: './manageable-services.component.css'
})
export class ManageableServicesComponent implements OnInit {
  showFilter: boolean;
  services: Service[];

  @ViewChild(MatPaginator) paginator: MatPaginator;

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
  searchKeyword: string = "";

  ngOnInit(): void {
    this.getPagedServices();
  }

  private getPagedServices() {
    this.service.getAllForProvider(this.pageProperties, this.activeFilter).subscribe({
      next: (response: PagedResponse<Service>) => {
        this.services = response.content;
        this.pageProperties.totalCount = response.totalElements;
      }
    })
  }

  onPageChanged(pageEvent: PageEvent): void {
    this.pageProperties.pageIndex = pageEvent.pageIndex;
    this.pageProperties.pageSize = pageEvent.pageSize;
    if(this.searchKeyword !== "") {
      this.onSearch(this.searchKeyword);
    } else {
      this.getPagedServices();
    }
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

  onApplyFilter(filter: ServiceFilter): void {
    this.activeFilter = filter;
    this.pageProperties.pageIndex = 0;
    this.searchKeyword = "";
    this.service.filterProviderServices(filter, this.pageProperties).subscribe({
      next: (response: PagedResponse<Service>) => {
        this.services = response.content;
        this.pageProperties.totalCount = response.totalElements;
        if(this.pageProperties.pageIndex >= response.totalPages) {
          this.pageProperties.pageIndex = 1;
        }
      }
    });
    this.closeFilter();
  }

  onSearch(keyword: string): void {
    this.searchKeyword = keyword;
    this.service.searchProviderServices(keyword, this.pageProperties).subscribe({
      next: (services: PagedResponse<Service>) => {
        this.services = services.content;
        this.pageProperties.totalCount = services.totalElements;
      }
    });
  }

  openDeleteConfirmation(service: Service): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '450px',
      height: 'auto',
      disableClose: true,
      panelClass: 'custom-dialog-container',
      data: {
        name: service.name
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteService(service);
      }
      dialogRef.close();
    });
  }

  openFilter(): void {
    this.showFilter = true;
  }

  closeFilter(): void {
    this.showFilter = false;
  }
}
