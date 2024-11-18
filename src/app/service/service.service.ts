import {Injectable, OnInit} from '@angular/core';
import {Service} from './model/service.model';

const services: Service[] = [
  {
    id: "1",
    name: "Deluxe Wedding Catering",
    categoryName: "Catering",
    rating: 4.7,
    price: 900,
    eventType: "Wedding",
    provider: "Gourmet Bites"
  },
  {
    id: "2",
    name: "Corporate Event Photography",
    categoryName: "Photography",
    rating: 4.9,
    price: 400,
    eventType: "Corporate Event",
    provider: "Sharp Shots"
  },
  {
    id: "3",
    name: "Grand Ballroom Rental",
    categoryName: "Venue",
    rating: 4.5,
    price: 500,
    eventType: "Birthday Party",
    provider: "Grand Ballroom"
  },
  {
    id: "4",
    name: "Premium DJ Package",
    categoryName: "DJ Services",
    rating: 4.8,
    price: 200,
    eventType: "Wedding",
    provider: "Rhythm Beats"
  },
  {
    id: "5",
    name: "Elegant Baby Shower Decor",
    categoryName: "Decorations",
    price: 100,
    rating: 4.6,
    eventType: "Baby Shower",
    provider: "Creative Touch"
  },
  {
    id: "6",
    name: "Concert Security Team",
    categoryName: "Security",
    price: 300,
    rating: 4.3,
    eventType: "Concert",
    provider: "SecureGuard Inc."
  },
  {
    id: "7",
    name: "Luxury Limousine Service",
    categoryName: "Transportation",
    rating: 4.8,
    price: 900,
    eventType: "Wedding",
    provider: "Elite Rides"
  },
  {
    id: "8",
    name: "Professional Lighting Setup",
    categoryName: "Lighting",
    price: 500,
    rating: 4.7,
    eventType: "Concert",
    provider: "Bright Lights Co."
  },
  {
    id: "9",
    name: "Birthday Cake Customization",
    categoryName: "Bakery",
    price: 1000,
    rating: 4.9,
    eventType: "Birthday Party",
    provider: "Sweet Delights"
  },
  {
    id: "10",
    name: "On-Site Event Coordination",
    categoryName: "Event Planning",
    price: 2000,
    rating: 4.8,
    eventType: "Corporate Event",
    provider: "Event Masters"
  },
  {
    id: "11",
    name: "Kids Entertainment Package",
    categoryName: "Entertainment",
    price: 250,
    rating: 4.6,
    eventType: "Birthday Party",
    provider: "Fun Times Entertainment"
  },
  {
    id: "12",
    name: "Live Wedding Band",
    categoryName: "Music",
    price: 499,
    rating: 4.9,
    eventType: "Wedding",
    provider: "Harmony Sounds"
  },
  {
    id: "13",
    name: "Flower Arrangement Service",
    categoryName: "Florist",
    price: 530,
    rating: 4.7,
    eventType: "Baby Shower",
    provider: "Petal Perfection"
  },
  {
    id: "14",
    name: "Comprehensive AV Setup",
    categoryName: "Audio-Visual",
    price: 900,
    rating: 4.5,
    eventType: "Corporate Event",
    provider: "TechVision AV"
  }
];


@Injectable({
  providedIn: 'root'
})
export class ServiceService implements OnInit {
  private services: Service[] = []

  constructor() {
    for(let service of services) {
      this.services.push(service);
    }
  }

  ngOnInit(): void {

  }

  getAll(): Service[] {
    return services;
  }

  totalCountServices(): number {
    return this.services.length;
  }

  getPage(size: number, index: number): Service[] {
    return this.services.slice(index * size, index * size + size);
  }

  get(id: string): Service {
    return this.services.find(service => service.id == id);
  }

  findByName(name: string): Service[] {
    return this.services.filter(service => service.name.toLowerCase().includes(name.toLowerCase()));
  }

  delete(id: string) {
    this.services = this.services.filter(service => service.id !== id);
  }
}
