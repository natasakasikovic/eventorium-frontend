import {Component, OnInit} from '@angular/core';
import {ServiceService} from '../service.service';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {Confirmation} from '../model/confirmation.enum';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrl: './create-service.component.css'
})
export class CreateServiceComponent {
  categories: string[] =
  [
    "Wellness",
    "Lifestyle",
    "Entertainment",
    "Arts",
    "Creative",
    "Fitness",
    "Travel",
    "Music",
    "Adventure",
    "Education"
  ]

  createServiceForm: FormGroup = new FormGroup({
    name: new FormControl(),
    price: new FormControl(),
    discount: new FormControl(),
    description: new FormControl(),
    specialties: new FormControl(),
    checkboxes: new FormArray([]),
    confirmation: new FormControl(),
    visible: new FormControl(),
    available: new FormControl(),
    reservationDeadline: new FormControl(),
    cancellationDeadline: new FormControl(),
    minDuration: new FormControl(6),
    maxDuration: new FormControl(12),
    categories: new FormArray([]),
    categoryName: new FormControl('')
  });

  constructor(
    private serviceService: ServiceService
  ) {

  }

  onCreate(): void {
    console.log(this.createServiceForm.value.minDuration);
    // this.serviceService.create({
    //   available: this.createServiceForm.value.available,
    //   cancellationDeadline: this.createServiceForm.value.cancellationDeadline,
    //   categoryName: this.createServiceForm.value.categoryName,
    //   confirmation: this.createServiceForm.value.confirmation,
    //   description: this.createServiceForm.value.description,
    //   discount: this.createServiceForm.value.discount,
    //   minDuration: this.createServiceForm.value.minDuration,
    //   maxDuration: this.createServiceForm.value.maxDuration,
    //   eventType: null,
    //   id: null,
    //   name: this.createServiceForm.value.name,
    //   price: this.createServiceForm.value.price,
    //   provider: '',
    //   rating: 0,
    //   reservationDeadline: this.createServiceForm.value.reservationDeadline,
    //   specialties: this.createServiceForm.value.specialties,
    //   visible: this.createServiceForm.value.visible
    // });
  }


  protected readonly Confirmation = Confirmation;

}
