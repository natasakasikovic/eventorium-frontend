import { Component, OnInit } from '@angular/core';
import { EventSummary } from '../../event/model/event-summary.model';
import { FavouritesService } from '../favourites.service';
import { Service } from '../../service/model/service.model';
import { Product } from '../../product/model/product.model';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {
  events: EventSummary[] = [];
  services: Service[] = [];
  products: Product[] = [];

  servicesLoaded = false;
  productsLoaded = false;

  constructor(private service: FavouritesService) {}

  ngOnInit(): void {
    this.loadFavouriteEvents();
  }

  onTabChange(event: MatTabChangeEvent): void {
    const selectedTab = event.index;
    switch (selectedTab) {
      case 1:
        if (!this.servicesLoaded)
          this.loadFavouriteServices();
        break;
      case 2:
        if (!this.productsLoaded)
          this.loadFavouriteProducts();
        break;
    }
  }

  loadFavouriteEvents(): void {
    this.service.getFavourites<EventSummary>('events').subscribe({
      next: (events) => {
        this.events = events;
      }
    });
  }

  loadFavouriteServices(): void {
    this.service.getFavourites<Service>('services').subscribe({
      next: (services) => {
        this.services = services;
        this.servicesLoaded = true;
      }
    });
  }

  loadFavouriteProducts(): void {
    this.service.getFavourites<Product>('products').subscribe({
      next: (products) => {
        this.products = products;
        this.productsLoaded = true;
      }
    });
  }
}
