import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ServiceService} from '../service.service';
import {Service} from '../model/service.model';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ServiceCardComponent} from '../../shared/service-card/service-card.component';
import {ServiceFilter} from '../model/filter-service-options.model';
import {PagedResponse} from '../../shared/model/paged-response.model';

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

  pageProperties = {
    pageIndex: 0,
    pageSize: 15,
    totalCount: 0
  }

  ngOnInit(): void {
    this.getPagedServices();
  }

  private getPagedServices() {
    this.service.getAllForProvider(this.pageProperties).subscribe({
      next: (response: PagedResponse<Service>) => {
        this.services = response.content;
        this.pageProperties.totalCount = response.totalElements;
      }
    })
  }

  onPageChanged(pageEvent: PageEvent): void {
    this.pageProperties.pageIndex = pageEvent.pageIndex;
    this.pageProperties.pageSize = pageEvent.pageSize;
    this.getPagedServices();
  }

  deleteService(id: number) {
    this.service.delete(id);
  }

  onApplyFilter(filter: ServiceFilter): void {
    this.service.filterProviderServices(filter, this.pageProperties).subscribe({
      next: (services: PagedResponse<Service>) => {
        this.services = services.content;
        this.pageProperties.totalCount = services.totalElements;
      }
    });
    this.closeFilter();
  }

  onSearch(keyword: string): void {
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
