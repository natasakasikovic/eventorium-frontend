import { Component, OnInit } from '@angular/core';
import { EventType } from '../model/event-type.model';
import { MatSelectChange } from '@angular/material/select';
import { Category } from '../../category/model/category.model';
import { EventTypeService } from '../event-type.service';
import { CategoryService } from '../../category/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {catchError, Observable, switchMap, tap, throwError} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {ERROR_MESSAGES} from '../../shared/constants/error-messages';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-edit-event-type',
  templateUrl: './edit-event-type.component.html',
  styleUrl: './edit-event-type.component.css'
})
export class EditEventTypeComponent implements OnInit {
  eventType: EventType;
  currentlySelectedCategory: Category | null = null;
  availableCategories: Category[];
  selectedCategories: Category[];
  image: File | null = null;
  imageUrl: string | null = null;

  editEventTypeForm: FormGroup = new FormGroup({
    description: new FormControl('', Validators.required)
  });

  constructor(private eventTypeService: EventTypeService,
    private categoryService: CategoryService,
    private router: Router,
    private toasterService: ToastrService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCategories();
    this.route.params.subscribe((params) => {
      const id = +params['id']
      this.eventTypeService.get(id).pipe(
        switchMap((data: EventType) => {
          this.eventType = data;
          this.editEventTypeForm.patchValue({
            description: this.eventType.description
          });
          this.selectedCategories = this.eventType.suggestedCategories;
          return this.getImage();
        })
      ).subscribe({
        next: (blob: Blob) => {
          this.eventType.image = URL.createObjectURL(blob);
        }
      })
    })
  }

  private getImage(): Observable<Blob> {
    return this.eventTypeService.getImage(this.eventType.id).pipe(
      tap(() => console.log('Success')),
      catchError((error: HttpErrorResponse) => {
        this.toasterService.error(ERROR_MESSAGES.GENERAL_ERROR, ERROR_MESSAGES.IMAGES_UPLOAD_ERROR);
        return throwError(() => error);
      })
    );
  }

  getCategories(): void {
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

  saveEventType() {
    if (this.editEventTypeForm.invalid || this.selectedCategories.length === 0) {
      return;
    }

    this.eventTypeService.update(this.eventType.id, {
      name: this.eventType.name,
      description: this.editEventTypeForm.value.description,
      suggestedCategories: this.selectedCategories
    }).subscribe(
      {
        next: () => {
          if (this.image != null) {
            this.eventTypeService.updateImage(this.eventType.id, this.image).subscribe({
              error: (error : HttpErrorResponse) => {
                this.toasterService.error(error.error.message, ERROR_MESSAGES.IMAGE_UPLOAD_ERROR);
              }
            })
          }
          void this.router.navigate(['event-types']);
        }
      }
    )
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file : File = input.files[0];
      this.image = file;
      this.eventType.image = URL.createObjectURL(file);
    }
  }

}
