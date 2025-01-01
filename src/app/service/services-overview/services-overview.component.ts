import { Component, OnInit, ViewChild } from '@angular/core';
import { Service } from '../model/service.model';
  import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ServiceService } from '../service.service';
import { ServiceFilter } from '../model/filter-service-options.model';
import { PagedResponse } from '../../shared/model/paged-response.model';
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';

@Component({
  selector: 'app-services-overview',
  templateUrl: './services-overview.component.html',
  styleUrl: './services-overview.component.css'
})

export class ServicesOverviewComponent implements OnInit {

  pageProperties = {
    pageIndex: 0,
    pageSize: 10,
    totalCount: 0
  }

  showFilter: boolean;
  services: Service[];
  keyword: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor( private service: ServiceService ) { }

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
    else
      this.getPagedServices();

  }

  closeFilter(): void {
    this.showFilter = false;
  }

  openFilter(): void {
    this.showFilter = true;
  }

  onSearch(keyword: string): void {
    this.keyword = keyword
    this.service.searchServices(keyword, this.pageProperties).subscribe({
      next: (response: PagedResponse<Service>) => {
        this.services = response.content
        this.pageProperties.totalCount = response.totalElements
      }
    })
  }

  onApplyFilter(filter: ServiceFilter): void {
    this.services = this.service.filterServices(filter);
    this.closeFilter();
  }

}
