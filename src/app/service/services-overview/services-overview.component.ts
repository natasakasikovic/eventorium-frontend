import { Component, OnInit, ViewChild } from '@angular/core';
import { Service } from '../model/service.model';
import { PageEvent } from '@angular/material/paginator';
import { ServiceService } from '../service.service';
import { ServiceFilter } from '../model/service-filter.model';
import { PagedResponse } from '../../shared/model/paged-response.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ServicesFilterDialogComponent } from '../services-filter-dialog/services-filter-dialog.component';
import { InfoDialogComponent } from '../../shared/info-dialog/info-dialog.component';
import { ERROR_MESSAGES } from '../../shared/constants/error-messages';
import {PageProperties} from '../../shared/model/page-properties.model';

@Component({
  selector: 'app-services-overview',
  templateUrl: './services-overview.component.html',
  styleUrl: './services-overview.component.css'
})

export class ServicesOverviewComponent implements OnInit {

  pageProperties: PageProperties = {
    pageIndex: 0,
    pageSize: 10,
    totalCount: 0
  }

  services: Service[];
  keyword: string;
  activeFilter: ServiceFilter;
  selectedSort: string;

  constructor( private service: ServiceService, private dialog: MatDialog ) { }

  ngOnInit(): void {
    this.getPagedServices();
  }

  private getPagedServices() {
    this.service.getAll(this.pageProperties).subscribe({
      next: (response: PagedResponse<Service>) => {
        this.services = response.content;
        this.pageProperties.totalCount = response.totalElements;
      }
    })
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

  openDialog(): void {
    let dialog = this.dialog.open(ServicesFilterDialogComponent, {
      height: '510px',
      width: '600px',
    });

    this.handleDialogClose(dialog);
  }

  private handleDialogClose(dialogRef: MatDialogRef<ServicesFilterDialogComponent>): void {
    dialogRef.afterClosed().subscribe((filter: ServiceFilter) => {
      this.filterServices(filter);
    });
  }

  onSortChange(value: string): void {
  const [sortBy, sortDirection] = value.split('_');
  this.pageProperties.sortBy = sortBy;
  this.pageProperties.sortDirection = sortDirection as 'asc' | 'desc';

  if (this.keyword)
    this.onSearch(this.keyword);
  else if (this.activeFilter)
    this.filterServices(this.activeFilter);
  else
    this.getPagedServices();
  }

  private preprocessFilter(filter: ServiceFilter){
    this.resetPageIndex(null, filter);
    this.activeFilter = filter;
    this.keyword = null;
  }

  filterServices(filter: ServiceFilter) {
    this.preprocessFilter(filter);
    this.service.filterServices(filter, this.pageProperties).subscribe({
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
    this.resetPageIndex(keyword, null)
    this.keyword = keyword
    this.service.searchServices(keyword, this.pageProperties).subscribe({
      next: (response: PagedResponse<Service>) => {
        this.services = response.content
        this.pageProperties.totalCount = response.totalElements
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

  private resetPageIndex(keyword: string | null, filter: ServiceFilter | null): void {
    if ((keyword && this.keyword != keyword) || (filter && this.activeFilter !== filter) && this.pageProperties.pageIndex != 0)
      this.pageProperties.pageIndex = 0
  }

}
