import {Component, Input} from '@angular/core';
import {Service} from '../model/service.model';
import {ActivatedRoute} from '@angular/router';
import {ServiceService} from '../service.service';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrl: './edit-service.component.css'
})
export class EditServiceComponent {
  @Input() service: Service

  constructor(
    private route: ActivatedRoute,
    private serviceService: ServiceService
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      const id: string = param['id'];
      this.service = this.serviceService.get(id);
    });
  }
}
