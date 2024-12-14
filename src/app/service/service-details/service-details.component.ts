import {Component, Input, OnInit} from '@angular/core';
import {Service} from '../model/service.model';
import {ActivatedRoute} from '@angular/router';
import {ServiceService} from '../service.service';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrl: './service-details.component.css'
})
export class ServiceDetailsComponent implements OnInit {
  @Input() service: Service

  constructor(
    private route: ActivatedRoute,
    private serviceService: ServiceService
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      const id: number = +param['id'];
      this.service = this.serviceService.get(id);
    });
  }
}
