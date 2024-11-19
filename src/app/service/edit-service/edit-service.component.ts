import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Service} from '../model/service.model';
import {ActivatedRoute} from '@angular/router';
import {ServiceService} from '../service.service';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {Confirmation} from '../model/confirmation.enum';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrl: './edit-service.component.css'
})
export class EditServiceComponent implements OnInit {
  @Input() service: Service

  createServiceForm: FormGroup;

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
    this.createServiceForm = new FormGroup({
      name: new FormControl(this.service.name),
      price: new FormControl(this.service.price),
      discount: new FormControl(this.service.discount),
      description: new FormControl(this.service.description),
      specialties: new FormControl(this.service.specialties),
      checkboxes: new FormArray([]),
      confirmation: new FormControl(this.service.confirmation ),
      visible: new FormControl(this.service.visible),
      available: new FormControl(this.service.available),
      reservationDeadline: new FormControl(this.service.reservationDeadline),
      cancellationDeadline: new FormControl(this.service.cancellationDeadline),
      minDuration: new FormControl(this.service.duration),
      maxDuration: new FormControl(''),
    });
  }

  protected readonly Component = Component;
  protected readonly Confirmation = Confirmation;
}
