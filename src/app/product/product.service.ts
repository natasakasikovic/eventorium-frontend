import { Injectable, OnInit } from '@angular/core';
import { Product } from './model/product.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../env/environment';

const products: Product[] = [
  { id: 1, name: "Helium Balloons", price: 9.99, image: "balloons.jpg" },
  { id: 2, name: "LED Balloons", price: 12.99, image: "balloons.jpg" },
  { id: 3, name: "Balloon Arch Kit", price: 29.99, image: "balloons.jpg" },
  { id: 4, name: "Confetti Balloons", price: 14.99, image: "balloons.jpg" },
  { id: 5, name: "Personalized Balloons", price: 19.99, image: "balloons.jpg" },
  { id: 6, name: "Foil Balloons", price: 7.99, image: "balloons.jpg" },
  { id: 7, name: "Giant Balloons", price: 24.99, image: "balloons.jpg" },
  { id: 8, name: "Animal-Shaped Balloons", price: 11.99, image: "balloons.jpg" },
  { id: 9, name: "Birthday Balloon Set", price: 15.99, image: "balloons.jpg" },
  { id: 10, name: "Balloon Bouquet", price: 18.99, image: "balloons.jpg" },
  { id: 11, name: "Glow-in-the-Dark Balloons", price: 10.99, image: "balloons.jpg" },
  { id: 12, name: "Shaped Foil Balloons", price: 13.99, image: "balloons.jpg" },
  { id: 13, name: "Rainbow Balloons", price: 9.49, image: "balloons.jpg" },
  { id: 14, name: "Sparkling Balloons", price: 16.99, image: "balloons.jpg" },
  { id: 15, name: "Balloon Garland", price: 28.99, image: "balloons.jpg" },
  { id: 16, name: "Balloons with LED Lights", price: 19.49, image: "balloons.jpg" },
  { id: 17, name: "Heart-Shaped Balloons", price: 8.99, image: "balloons.jpg" },
  { id: 18, name: "Number Balloons", price: 5.99, image: "balloons.jpg" },
  { id: 19, name: "Custom Printed Balloons", price: 20.99, image: "balloons.jpg" },
  { id: 20, name: "Glitter Balloons", price: 17.99, image: "balloons.jpg" },
  { id: 21, name: "Wedding Balloons", price: 22.99, image: "balloons.jpg" },
  { id: 22, name: "Celebration Balloon Kit", price: 30.99, image: "balloons.jpg" }
];

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = []

  constructor(private httpClient: HttpClient) {
    for(let product of products) {   // TODO: delete this and products starting from line 7 to 30
      this.products.push(product);
    }
  }

  getTopProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(environment.apiHost + "/products/top-five-products")
  }

  totalCountProducts(): number {
    return this.products.length;
  }

  getPage(size: number, index: number): Product[] {
    return this.products.slice(index * size, index * size + size);
  }

  searchProducts(keyword: string): Product[] {
    return this.products.filter(product => product.name.toLowerCase().includes(keyword.toLowerCase()));
  }
  
}
