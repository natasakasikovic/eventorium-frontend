import { Injectable, OnInit } from '@angular/core';
import { Product } from './model/product.model';

const products: Product[] = [
  {
      id: 1,
      name: "Helium Balloons",
      price: 9.99,
      image: "balloons.jpg"
  },
  {
      id: 2,
      name: "LED Balloons",
      price: 12.99,
      image: "balloons.jpg"
  },
  {
      id: 3,
      name: "Balloon Arch Kit",
      price: 29.99,
      image: "balloons.jpg"
  },
  {
      id: 4,
      name: "Confetti Balloons",
      price: 14.99,
      image: "balloons.jpg"
  },
  {
      id: 5,
      name: "Personalized Balloons",
      price: 19.99,
      image: "balloons.jpg"
  }
];


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = []

  constructor() {
    for(let product of products) {
      this.products.push(product);
    }
  }

  getTopProducts(): Product[] {
    return products;
  }
}
