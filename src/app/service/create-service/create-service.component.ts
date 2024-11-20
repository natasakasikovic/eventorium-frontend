import {Component, OnInit} from '@angular/core';
import {ServiceService} from '../service.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Confirmation} from '../model/confirmation.enum';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.css']
})
export class CreateServiceComponent implements OnInit {
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
  eventTypes: string[] = ["Group", "Individual", "Social", "Concert", "Trip"];
  createServiceForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    discount: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]),
    description: new FormControl('', Validators.required),
    specialties: new FormControl('', Validators.required),
    eventTypes: new FormControl('', Validators.minLength(1)),
    confirmation: new FormControl('', Validators.required),
    suggestedCategory: new FormControl(),
    category: new FormControl(),
    visible: new FormControl(),
    available: new FormControl(),
    reservationDeadline: new FormControl('', Validators.required),
    cancellationDeadline: new FormControl('', Validators.required),
    minDuration: new FormControl(6),
    maxDuration: new FormControl(12),
  });

  constructor(
    private serviceService: ServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {

  }

  onCreate(): void {
    if(this.createServiceForm.valid) {
      this.serviceService.create({
        available: this.createServiceForm.value.available,
        cancellationDeadline: this.createServiceForm.value.cancellationDeadline,
        categoryName: this.createServiceForm.value.category,
        confirmation: this.createServiceForm.value.confirmation,
        description: this.createServiceForm.value.description,
        discount: this.createServiceForm.value.discount,
        eventTypes: this.createServiceForm.value.eventTypes,
        id: Math.random().toString(),
        maxDuration: this.createServiceForm.value.maxDuration,
        minDuration: this.createServiceForm.value.minDuration,
        name: this.createServiceForm.value.name,
        price: this.createServiceForm.value.price,
        provider: "Test",
        rating: 0,
        reservationDeadline: this.createServiceForm.value.reservationDeadline,
        specialties: this.createServiceForm.value.specialties,
        visible: this.createServiceForm.value.visible,
        image: ""
      });
      this.router.navigate(["manageable-services"]).then();
    }
  }

  protected readonly Confirmation = Confirmation;
}
