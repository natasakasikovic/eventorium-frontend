import {Component, Input, OnInit} from '@angular/core';
import {Service} from '../model/service.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ServiceService} from '../service.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ReservationType} from '../model/reservation-type.enum';
import {EventTypeService} from '../../event-type/event-type.service';
import {EventType} from '../../event-type/model/event-type.model';
import {switchMap} from 'rxjs';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrl: './edit-service.component.css'
})
export class EditServiceComponent implements OnInit {
  @Input() service: Service
  eventTypes: EventType[] = [];
  editServiceForm: FormGroup = new FormGroup({
    name: new FormControl("", Validators.required),
    price: new FormControl("", Validators.required),
    discount: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    specialties: new FormControl("", Validators.required),
    type: new FormControl(ReservationType.MANUAL, Validators.required),
    isVisible: new FormControl("", Validators.required),
    isAvailable: new FormControl("", Validators.required),
    reservationDeadline: new FormControl("", Validators.required),
    cancellationDeadline: new FormControl("", Validators.required),
    minDuration: new FormControl("", Validators.required),
    maxDuration: new FormControl("", Validators.required),
    eventTypes: new FormControl("", Validators.required)
  });

  constructor(
    private route: ActivatedRoute,
    private serviceService: ServiceService,
    private eventTypeService: EventTypeService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      const id: number = +param['id'];

      this.eventTypeService.getAll().pipe(
        switchMap((eventTypes: EventType[]) => {
          this.eventTypes = eventTypes;
          return this.serviceService.get(id);
        })
      ).subscribe({
        next: (service: Service) => {
          this.service = service;
          this.loadForm();
        },
        error: (err) => {
          console.error('An error occurred', err);
        }
      });
    });
  }

  onUpdate(): void {
    if(!this.editServiceForm.invalid) {
      const formValue = this.editServiceForm.value;
      this.serviceService.update(this.service.id, {
        cancellationDeadline: formValue.cancellationDeadline,
        description: formValue.description,
        discount: formValue.discount,
        eventTypesIds: formValue.eventTypes,
        isAvailable: formValue.isAvailable,
        isVisible: formValue.isVisible,
        maxDuration: formValue.maxDuration,
        minDuration: formValue.minDuration,
        name: formValue.name,
        price: formValue.price,
        reservationDeadline: formValue.reservationDeadline,
        specialties: formValue.specialties,
        type: formValue.type
      }).subscribe({
        next: (service: Service) => {
          console.log(`Successfully updated ${service.name}!`);
          void this.router.navigate(['manageable-services']);
        },
        error: (error: Error) => {
          console.log(`Error updating service: ${error.message}`);
        }

      });
    }
  }

  private loadForm() {
    console.log(typeof this.service.type);
    this.editServiceForm.patchValue({
      name: this.service.name,
      price: this.service.price,
      discount: this.service.discount,
      description: this.service.description,
      specialties: this.service.specialties,
      type: this.service.type,
      isVisible: this.service.isVisible,
      isAvailable: this.service.isAvailable,
      reservationDeadline: this.service.reservationDeadline,
      cancellationDeadline: this.service.cancellationDeadline,
      minDuration: this.service.minDuration,
      maxDuration: this.service.maxDuration,
      eventTypes: this.service.eventTypes.map(eventType => eventType.id)
    });
  }

  protected readonly ReservationType = ReservationType;
}
