import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ServiceService} from '../service.service';
import {Service} from '../model/service.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ServiceCardComponent} from '../../shared/service-card/service-card.component';
import {ServiceFilter} from '../model/filter-service-options.model';

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
    private serviceService: ServiceService,
    private changeDetector: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
  }

  getTotalServiceCount(): number { // NOTE: I commented this since I deleted this method, it is redudant when you connect to backend
    // return this.serviceService.totalCountServices();
    return 0;
  }

  onPageChanged(): void {
    this.services = [];
  }

  deleteService(id: number) {
    this.serviceService.delete(id);
    this.onPageChanged();
  }

  onApplyFilter(filter: ServiceFilter): void {
    this.services = this.serviceService.filterServices(filter);
    this.closeFilter();
    this.changeDetector.detectChanges();
  }

  onSearch(keyword: string): void {
    // this.services = this.serviceService.searchServices(keyword);
    this.changeDetector.detectChanges();
  }

  openFilter(): void {
    this.showFilter = true;
  }

  closeFilter(): void {
    this.showFilter = false;
  }
}
