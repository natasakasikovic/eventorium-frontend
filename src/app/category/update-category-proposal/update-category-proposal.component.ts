import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from '../model/category.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../category.service';

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
    this.categories = this.categoryService.getAll();
  }

  onClose(): void {
    this.close.emit();
  }

  onSave(): void {
    console.log(this.updateProposalForm.value);
    this.onClose();
  }
}
