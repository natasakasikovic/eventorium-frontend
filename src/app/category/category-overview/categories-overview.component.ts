import {Component, OnInit} from '@angular/core';
import {Category} from '../model/category.model';
import {CategoryService} from '../category.service';

@Component({
  selector: 'app-category-overview',
  templateUrl: './categories-overview.component.html',
  styleUrl: './categories-overview.component.css'
})
export class CategoriesOverviewComponent implements OnInit {
  categories: Category[];

  constructor(
    private categoryService: CategoryService
  ) {
  }

  ngOnInit(): void {
    this.categories = this.categoryService.getAll();
  }

}
