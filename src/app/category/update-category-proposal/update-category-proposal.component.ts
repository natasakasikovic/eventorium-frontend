import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from '../model/category.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../category.service';
import {CategoryRequestDto} from '../model/category-request-dto.model';

@Component({
  selector: 'app-update-category-proposal',
  templateUrl: './update-category-proposal.component.html',
  styleUrl: './update-category-proposal.component.css'
})
export class UpdateCategoryProposalComponent implements OnInit, AfterViewInit {
  @Input() category: Category;
  @Output() close: EventEmitter<void> = new EventEmitter();

  categories: Category[]

  updateProposalForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    category: new FormControl(''),
  });

  constructor(
    private categoryService: CategoryService
  ) {
  }

  ngAfterViewInit(): void {
    this.updateProposalForm.get('name').setValue(this.category.name);
    this.updateProposalForm.get('description').setValue(this.category.description);
  }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe({
      next: (categories: Category[]) => {
        this.categories = [...categories];
      }
    })
  }

  onClose(): void {
    this.close.emit();
  }

  onSave(): void {

    if(this.updateProposalForm.value.category === '') {
      let category: CategoryRequestDto = {
        name: this.updateProposalForm.value.name,
        description: this.updateProposalForm.value.description
      }
      this.categoryService.updateCategoryProposal(this.category.id, category).subscribe({
        next: (category: Category) => {
          console.log(`Successfully updated category ${category.name}!`);
        }
      });
    } else {
      this.categoryService.changeCategoryProposal(this.category.id, this.updateProposalForm.value.category).subscribe({
        next: (category: Category) => {
          console.log(`Successfully updated category ${category.name}!`);
        },
        error: (error: Error) => {
          console.error(`Failed to update category ${error.message}`);
        }
      })
    }

    this.onClose();
  }
}
