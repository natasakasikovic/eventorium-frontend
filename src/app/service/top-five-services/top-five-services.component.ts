import { Component, OnInit } from '@angular/core';
import { Service } from '../model/service.model';
import { ServiceService } from '../service.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-top-five-services',
  templateUrl: './top-five-services.component.html',
  styleUrl: './top-five-services.component.css'
})
export class TopFiveServicesComponent implements OnInit {
  services: Service[];

  constructor(private serviceService: ServiceService, private router: Router ) {}

  ngOnInit(): void {
    this.loadTopServices();
  }

  loadTopServices(): void {
    this.services = this.serviceService.getTopServices();
  }

  navigateToServicesOverview() {
    this.router.navigate(['/services-overview']);
  }

}