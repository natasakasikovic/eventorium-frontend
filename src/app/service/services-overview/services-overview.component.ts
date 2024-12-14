import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Service } from '../model/service.model';
  import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ServiceService } from '../service.service';
import { ServiceFilter } from '../model/filter-service-options.model';
import { PagedResponse } from '../../shared/model/paged-response.model';

@Component({
  selector: 'app-services-overview',
  templateUrl: './services-overview.component.html',
  styleUrl: './services-overview.component.css'
})

export class ServicesOverviewComponent implements OnInit {

  pageProperties = {
    pageIndex: 0,
    pageSize: 15,
    totalCount: 0
  }

  showFilter: boolean;
  services: Service[];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor( private service: ServiceService, private changeDetector: ChangeDetectorRef ) { }

  ngOnInit(): void {
    this.getPagedServices();
  }

  private getPagedServices() {
    this.service.getAll(this.pageProperties).subscribe({
      next: (response: PagedResponse<Service>) => {
        this.services = response.content;
        this.pageProperties.totalCount = response.totalElements;
        response.content.forEach(s => this.service.getImage(s.id).subscribe({
          next: (data: Blob) => {
            s.image = URL.createObjectURL(data);
          }
        }))
      }
    })
  }

  onPageChanged(pageEvent : PageEvent): void {
    this.pageProperties.pageIndex = pageEvent.pageIndex;
    this.pageProperties.pageSize = pageEvent.pageSize;
    this.getPagedServices();
  }

  closeFilter(): void {
    this.showFilter = false;
  }

  openFilter(): void {
    this.showFilter = true;
  }

  onSearch(keyword: string): void {
    this.services = this.service.searchServices(keyword);
    this.changeDetector.detectChanges();
  }

  onApplyFilter(filter: ServiceFilter): void {
    this.services = this.service.filterServices(filter);
    this.closeFilter();
    this.changeDetector.detectChanges();
  }

}
