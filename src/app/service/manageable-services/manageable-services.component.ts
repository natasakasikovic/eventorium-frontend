import { Component } from '@angular/core';
import {ServiceService} from '../service.service';
import {Service} from '../model/service.model';

@Component({
  selector: 'app-manageable-services',
  templateUrl: './manageable-services.component.html',
  styleUrl: './manageable-services.component.css'
})
export class ManageableServicesComponent {
  showFilter: boolean;
  services: Service[];

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

  ngOnInit(): void {
    this.services = this.service.getAll();
  }
}
