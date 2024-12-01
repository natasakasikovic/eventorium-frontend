import {AfterViewInit, Component, EventEmitter, Input, Output} from '@angular/core';
import {Category} from '../model/category.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../category.service';
import {Status} from '../model/status.enum';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements AfterViewInit {
  @Input() category: Category
  @Output() close: EventEmitter<void> = new EventEmitter();

  editCategoryForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  constructor(
    private categoryService: CategoryService
  ) {}

  ngAfterViewInit(): void {
    this.editCategoryForm.get('name').setValue(this.category.name);
    this.editCategoryForm.get('description').setValue(this.category.description);
  }

  onClose(): void {
    this.close.emit();
  }

  onSave(): void {
    if(this.editCategoryForm.valid) {
      this.categoryService.update(this.category.id, {
        name: this.editCategoryForm.value.name,
        description: this.editCategoryForm.value.description,
      }).subscribe({
        next: () => {
          this.onClose();
        },
        error: (e: Error) => {
          console.log(e);
        }
      });
    }
  }
}
