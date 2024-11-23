import {Component, Input, OnInit} from '@angular/core';
import {Service} from '../model/service.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ServiceService} from '../service.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Confirmation} from '../model/confirmation.enum';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrl: './edit-service.component.css'
})
export class EditServiceComponent implements OnInit {
  @Input() service: Service
  eventTypes: string[] = ["Group", "Individual", "Social", "Concert", "Trip"];
  editServiceForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private serviceService: ServiceService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      const id: number = param['id'];
      this.service = this.serviceService.get(id);
    });
    this.editServiceForm = new FormGroup({
      name: new FormControl(this.service.name),
      price: new FormControl(this.service.price),
      discount: new FormControl(this.service.discount),
      description: new FormControl(this.service.description),
      specialties: new FormControl(this.service.specialties),
      confirmation: new FormControl(this.service.confirmation ),
      visible: new FormControl(this.service.visible),
      available: new FormControl(this.service.available),
      reservationDeadline: new FormControl(this.service.reservationDeadline),
      cancellationDeadline: new FormControl(this.service.cancellationDeadline),
      minDuration: new FormControl(this.service.minDuration),
      maxDuration: new FormControl(this.service.maxDuration),
      eventTypes: new FormControl(this.service.eventTypes)
    });
  }

  onUpdate(): void {
    this.serviceService.update(this.service.id, {
      available: this.editServiceForm.value.available,
      cancellationDeadline: this.editServiceForm.value.cancellationDeadline,
      categoryName: this.service.categoryName,
      confirmation: this.editServiceForm.value.confirmation,
      description: this.editServiceForm.value.description,
      discount: this.editServiceForm.value.discount,
      minDuration: this.editServiceForm.value.minDuration,
      maxDuration: this.editServiceForm.value.maxDuration,
      eventTypes: this.service.eventTypes,
      id: this.service.id,
      name: this.editServiceForm.value.name,
      price: this.editServiceForm.value.price,
      provider: this.service.provider,
      rating: this.service.rating,
      reservationDeadline: this.editServiceForm.value.reservationDeadline,
      specialties: this.editServiceForm.value.specialties,
      visible: this.editServiceForm.value.visible,
      image: this.editServiceForm.value.image
    });
    this.router.navigate(['manageable-services']).then();
  }

  protected readonly Confirmation = Confirmation;
}
