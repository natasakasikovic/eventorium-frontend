import { Component } from '@angular/core';
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
    minDuration: new FormControl(),
    maxDuration: new FormControl(''),
  })

  constructor(
    private serviceService: ServiceService
  ) {}

  onCreate(): void {
    this.serviceService.create({
      available: false,
      cancellationDeadline: undefined,
      categoryName: "",
      confirmation: undefined,
      description: "",
      discount: 0,
      duration: 0,
      eventType: "",
      id: "",
      name: "",
      price: 0,
      provider: "",
      rating: 0,
      reservationDeadline: undefined,
      specialties: "",
      visible: false
    });
  }


  protected readonly Confirmation = Confirmation;
}
