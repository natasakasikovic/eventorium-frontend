import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Service } from '../model/service.model';
import { MatPaginator } from '@angular/material/paginator';
import { ServiceService } from '../service.service';
import { ServiceFilter } from '../model/filter-service-options.model';

@Component({
  selector: 'app-services-overview',
  templateUrl: './services-overview.component.html',
  styleUrl: './services-overview.component.css'
})

export class ServicesOverviewComponent implements OnInit, AfterViewInit {

  showFilter: boolean;
  services: Service[];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor( private serviceService: ServiceService, private changeDetector: ChangeDetectorRef ) { }

  ngOnInit(): void { }

  closeFilter(): void {
    this.showFilter = false;
  }

  openFilter(): void {
    this.showFilter = true;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.services = this.serviceService.getPage(this.paginator.pageSize, this.paginator.pageIndex); }, 0);
  }

  getTotalServiceCount(): number {
    return this.serviceService.totalCountServices();
  }

  onPageChanged(): void {
    this.services = this.serviceService.getPage(this.paginator.pageSize, this.paginator.pageIndex);
  }

  onSearch(keyword: string): void {
    this.services = this.serviceService.searchServices(keyword);
    this.changeDetector.detectChanges();
  }

  onApplyFilter(filter: ServiceFilter): void {
    this.services = this.serviceService.filterServices(filter);
    this.closeFilter();
    this.changeDetector.detectChanges();
  }

}
