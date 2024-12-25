import {Component, OnInit, ViewChild} from '@angular/core';
import {ServiceService} from '../service.service';
import {Service} from '../model/service.model';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {ServiceFilter} from '../model/filter-service-options.model';
import {PagedResponse} from '../../shared/model/paged-response.model';
import {PageProperties} from '../../shared/model/page-properties.model';

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

  deleteService(id: number) {
    this.service.delete(id).subscribe({
      next: () => {
        console.log(`Successfully deleted service ${id}!`);
        this.services = this.services.filter(service => service.id !== id);
      },
      error: (error: Error) => {
        console.error(`Failed to delete service: ${error.message}`);
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

  openFilter(): void {
    this.showFilter = true;
  }

  closeFilter(): void {
    this.showFilter = false;
  }
}
