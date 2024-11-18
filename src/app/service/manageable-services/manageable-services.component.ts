import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ServiceService} from '../service.service';
import {Service} from '../model/service.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ServiceCardComponent} from '../../shared/service-card/service-card.component';

@Component({
  selector: 'app-manageable-services',
  templateUrl: './manageable-services.component.html',
  styleUrl: './manageable-services.component.css'
})
export class ManageableServicesComponent implements OnInit, AfterViewInit {
  showFilter: boolean;
  services: Service[];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: ServiceService,
  ) {
  }

  closeFilter(): void {
    this.showFilter = false;
  }

  openFilter(): void {
    this.showFilter = true;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.services = this.service.getPage(this.paginator.pageSize, this.paginator.pageIndex);
    }, 0);
  }

  ngOnInit(): void {
  }

  getTotalServiceCount(): number {
    return this.service.totalCountServices();
  }

  onPageChanged(): void {
    this.services = this.service.getPage(this.paginator.pageSize, this.paginator.pageIndex);
  }

  deleteService($event: string) {
    this.service.delete($event);
  }
}
