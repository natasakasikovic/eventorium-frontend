import { Injectable } from '@angular/core';
import {Category} from './model/category.model';


const categories: Category[] = [
  {
    id: 1,
    name: "Electronics",
    description: "Devices and gadgets that involve advanced technology, including computers, smartphones, and accessories."
  },
  {
    id: 2,
    name: "Clothing & Apparel",
    description: "Fashion items such as clothes, shoes, and accessories for men, women, and children."
  },
  {
    id: 3,
    name: "Home & Garden",
    description: "Products for home improvement, furniture, gardening, decor, and other household needs."
  },
  {
    id: 4,
    name: "Health & Beauty",
    description: "Personal care products such as skincare, haircare, makeup, and wellness items."
  },
  {
    id: 5,
    name: "Food & Beverage",
    description: "Edible goods including groceries, snacks, beverages, and prepared meals."
  },
  {
    id: 6,
    name: "Automotive",
    description: "Products and services related to vehicles, including car parts, accessories, and repair services."
  },
  {
    id: 7,
    name: "Sports & Outdoors",
    description: "Equipment and clothing for sports, fitness, and outdoor activities like camping, hiking, and cycling."
  },
  {
    id: 8,
    name: "Toys & Games",
    description: "Play items for children and adults, including toys, board games, and video games."
  },
  {
    id: 9,
    name: "Books & Media",
    description: "Printed materials like books, magazines, and other forms of media, including digital formats."
  },
  {
    id: 10,
    name: "Services",
    description: "Various services including consulting, cleaning, maintenance, and digital solutions."
  }
];

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categories: Category[] = [];

  constructor() {
    for(let category of categories) {
      this.categories.push(category);
    }
  }

  getAll(): Category[] {
    return this.categories;
  }

  get(id: number): Category {
    return this.categories.find(category => category.id === id);
  }

  update(id: number, category: Category): void {
    const oldCategory = this.get(id);
    oldCategory.name = category.name;
    oldCategory.description = category.description;
  }

  delete(id: number): void {
    this.categories = this.categories.filter(category => category.id !== id);
  }
}
