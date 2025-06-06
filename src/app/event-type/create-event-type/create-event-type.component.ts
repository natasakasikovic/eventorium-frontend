import {Component, OnInit} from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Category } from '../../category/model/category.model';
import { CategoryService } from '../../category/category.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventTypeService } from '../event-type.service';
import { EventType } from '../model/event-type.model';
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {HttpErrorResponse} from '@angular/common/http';
import {ERROR_MESSAGES} from '../../shared/constants/error-messages';
import {InfoDialogComponent} from '../../shared/info-dialog/info-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {catchError, of, switchMap, tap, throwError} from 'rxjs';
import {MESSAGES} from '../../shared/constants/messages';
import {Product} from '../../product/model/product.model';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event-type.component.html',
  styleUrls: ['./create-event-type.component.css']
})
export class CreateEventTypeComponent implements OnInit {
  selectedCategories: Category[] = [];
  currentlySelectedCategory: Category | null = null;
  availableCategories: Category[];
  image: File | null = null;
  imageUrl: string | null = null;

  createEventTypeForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  constructor(
    private eventTypeService: EventTypeService,
    private categoryService: CategoryService,
    private toasterService: ToastrService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.categoryService.getAll().subscribe({
      next: (categories: Category[]) => {
        this.availableCategories = categories;
     }
    });
  }

  onCategorySelect(event: MatSelectChange) {
    const category: Category = event.value;
    if (category && !this.selectedCategories.includes(category)) {
      this.selectedCategories.push(category);
    }
  }

  removeCategory(index: number) {
    this.selectedCategories.splice(index, 1);
    this.currentlySelectedCategory = null;
  }

  saveEvent() {
    if (this.createEventTypeForm.invalid || this.selectedCategories.length === 0) {
      console.error('Form is invalid or no categories selected');
      return;
    }

    this.eventTypeService.create({
      name: this.createEventTypeForm.value.name,
      description: this.createEventTypeForm.value.description,
      suggestedCategories: this.selectedCategories
    }).pipe(
      switchMap((eventType: EventType) => {
        this.toasterService.success(MESSAGES.eventTypeCreated, MESSAGES.success);
        return this.uploadImage(eventType);
      })
    ).subscribe({
      next: () => {
          void this.router.navigate(['event-types']);
      },
      error: (error: HttpErrorResponse) => {
          this.toasterService.error(error.error.message, "Failed to create event type");
      }
    });
  }

  private uploadImage(eventType: EventType) {
    if (this.image != null && eventType) {
      return this.eventTypeService.uploadImage(eventType.id, this.image).pipe(
        tap(() => console.log('Success')),
        catchError((error: HttpErrorResponse) => {
          this.toasterService.error(ERROR_MESSAGES.GENERAL_ERROR, ERROR_MESSAGES.IMAGES_UPLOAD_ERROR);
          return throwError(() => error);
        })
      );
    }
    return of(null);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file : File = input.files[0];
      this.image = file;
      this.imageUrl = URL.createObjectURL(file);
    }
  }
}

