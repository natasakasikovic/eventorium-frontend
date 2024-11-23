import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from '../model/category.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../category.service';

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
    console.log(this.category);
    this.editCategoryForm.get('name').setValue(this.category.name);
    this.editCategoryForm.get('description').setValue(this.category.description);
  }

  onClose(): void {
    this.close.emit();
  }

  onSave(): void {
    if(this.editCategoryForm.valid) {
      this.categoryService.update(this.category.id, {
        id: this.category.id,
        name: this.editCategoryForm.value.name,
        description: this.editCategoryForm.value.description
      });
      this.onClose();
    }
  }
}
