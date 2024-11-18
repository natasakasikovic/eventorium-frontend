import {Injectable, OnInit} from '@angular/core';
import {Service} from './model/service.model';

const services: Service[] = [
  {
    id: "1",
    name: "Massage Therapy",
    categoryName: "Health & Wellness",
    price: 80,
    rating: 4.5,
    eventType: "Private",
    provider: "Wellness Spa",
    duration: 60,
    description: "A relaxing full-body massage to relieve tension and stress.",
    specialties: "Aromatherapy, Deep Tissue",
    reservationDeadline: new Date('2024-12-01T18:00:00'),
    cancellationDeadline: new Date('2024-12-01T12:00:00')
  },
  {
    id: "2",
    name: "Yoga Class",
    categoryName: "Fitness",
    price: 15,
    rating: 4.8,
    eventType: "Group",
    provider: "Yoga Studio",
    duration: 75,
    description: "A guided group yoga class for all levels of experience.",
    specialties: "Vinyasa, Hatha",
    reservationDeadline: new Date('2024-11-20T09:00:00'),
    cancellationDeadline: new Date('2024-11-20T07:00:00')
  },
  {
    id: "3",
    name: "Cooking Class: Italian Cuisine",
    categoryName: "Culinary",
    price: 50,
    rating: 4.7,
    eventType: "Group",
    provider: "Gourmet Academy",
    duration: 120,
    description: "Learn to cook traditional Italian dishes with a professional chef.",
    specialties: "Pasta Making, Sauces",
    reservationDeadline: new Date('2024-11-25T16:00:00'),
    cancellationDeadline: new Date('2024-11-25T12:00:00')
  },
  {
    id: "4",
    name: "Private Wine Tasting",
    categoryName: "Food & Drink",
    price: 100,
    rating: 4.9,
    eventType: "Private",
    provider: "Vino Tours",
    duration: 90,
    description: "A personalized wine-tasting experience with a sommelier.",
    specialties: "Red Wines, Wine Pairing",
    reservationDeadline: new Date('2024-11-22T19:00:00'),
    cancellationDeadline: new Date('2024-11-22T17:00:00')
  },
  {
    id: "5",
    name: "Photography Session",
    categoryName: "Arts & Entertainment",
    price: 150,
    rating: 4.6,
    eventType: "Private",
    provider: "Lens Capture Studio",
    duration: 120,
    description: "A professional photo session for individuals or families.",
    specialties: "Portraits, Events",
    reservationDeadline: new Date('2024-11-23T10:00:00'),
    cancellationDeadline: new Date('2024-11-23T08:00:00')
  },
  {
    id: "6",
    name: "Dance Class: Salsa",
    categoryName: "Fitness",
    price: 20,
    rating: 4.3,
    eventType: "Group",
    provider: "Dance Academy",
    duration: 60,
    description: "A fun and energetic salsa dance class for beginners.",
    specialties: "Latin Dance, Salsa",
    reservationDeadline: new Date('2024-11-21T14:00:00'),
    cancellationDeadline: new Date('2024-11-21T12:00:00')
  },
  {
    id: "7",
    name: "Piano Lessons",
    categoryName: "Music & Arts",
    price: 40,
    rating: 4.8,
    eventType: "Private",
    provider: "Music School",
    duration: 45,
    description: "One-on-one piano lessons with a professional instructor.",
    specialties: "Classical, Jazz",
    reservationDeadline: new Date('2024-11-19T11:00:00'),
    cancellationDeadline: new Date('2024-11-19T09:00:00')
  },
  {
    id: "8",
    name: "Personal Training",
    categoryName: "Fitness",
    price: 70,
    rating: 4.7,
    eventType: "Private",
    provider: "Fit Studio",
    duration: 60,
    description: "Custom fitness plans and one-on-one training sessions.",
    specialties: "Strength Training, Weight Loss",
    reservationDeadline: new Date('2024-11-25T08:00:00'),
    cancellationDeadline: new Date('2024-11-25T06:00:00')
  },
  {
    id: "9",
    name: "Pet Grooming",
    categoryName: "Pets",
    price: 40,
    rating: 4.4,
    eventType: "Private",
    provider: "Pet Spa",
    duration: 45,
    description: "A full grooming service for your pets including bath, cut, and style.",
    specialties: "Dog Grooming, Cat Grooming",
    reservationDeadline: new Date('2024-11-23T12:00:00'),
    cancellationDeadline: new Date('2024-11-23T10:00:00')
  },
  {
    id: "10",
    name: "Guided Hiking Tour",
    categoryName: "Outdoor Activities",
    price: 35,
    rating: 4.6,
    eventType: "Group",
    provider: "Adventure Co.",
    duration: 120,
    description: "Explore scenic hiking trails with an expert guide.",
    specialties: "Nature Walks, Bird Watching",
    reservationDeadline: new Date('2024-11-27T09:00:00'),
    cancellationDeadline: new Date('2024-11-27T07:00:00')
  },
  {
    id: "11",
    name: "Home Cleaning",
    categoryName: "Home Services",
    price: 100,
    rating: 4.5,
    eventType: "Private",
    provider: "Clean Home",
    duration: 120,
    description: "A deep cleaning service for your home, including kitchen and bathrooms.",
    specialties: "Deep Cleaning, Organizing",
    reservationDeadline: new Date('2024-11-30T15:00:00'),
    cancellationDeadline: new Date('2024-11-30T12:00:00')
  },
  {
    id: "12",
    name: "Language Tutor: Spanish",
    categoryName: "Education",
    price: 30,
    rating: 4.9,
    eventType: "Private",
    provider: "Language Center",
    duration: 60,
    description: "One-on-one Spanish lessons with a native speaker.",
    specialties: "Conversational, Grammar",
    reservationDeadline: new Date('2024-11-20T13:00:00'),
    cancellationDeadline: new Date('2024-11-20T11:00:00')
  },
  {
    id: "13",
    name: "Haircut & Styling",
    categoryName: "Beauty",
    price: 50,
    rating: 4.7,
    eventType: "Private",
    provider: "Hair Salon",
    duration: 45,
    description: "A professional haircut and styling service.",
    specialties: "Women’s Cuts, Men’s Cuts",
    reservationDeadline: new Date('2024-11-22T10:00:00'),
    cancellationDeadline: new Date('2024-11-22T08:00:00')
  },
  {
    id: "14",
    name: "Golf Lessons",
    categoryName: "Sports",
    price: 60,
    rating: 4.6,
    eventType: "Private",
    provider: "Golf Academy",
    duration: 90,
    description: "Personalized golf lessons with a certified instructor.",
    specialties: "Swing Technique, Putting",
    reservationDeadline: new Date('2024-11-19T10:00:00'),
    cancellationDeadline: new Date('2024-11-19T08:00:00')
  },
  {
    id: "15",
    name: "Face Painting",
    categoryName: "Arts & Entertainment",
    price: 40,
    rating: 4.5,
    eventType: "Private",
    provider: "Party Creations",
    duration: 30,
    description: "Fun and creative face painting for kids' parties.",
    specialties: "Custom Designs, Glitter",
    reservationDeadline: new Date('2024-11-26T16:00:00'),
    cancellationDeadline: new Date('2024-11-26T14:00:00')
  },
  {
    id: "16",
    name: "Personalized Skincare Consultation",
    categoryName: "Beauty",
    price: 80,
    rating: 4.8,
    eventType: "Private",
    provider: "Glow Skincare",
    duration: 90,
    description: "Customized skincare consultation and recommendations.",
    specialties: "Anti-aging, Acne Treatment",
    reservationDeadline: new Date('2024-11-28T11:00:00'),
    cancellationDeadline: new Date('2024-11-28T09:00:00')
  },
  {
    id: "17",
    name: "Dog Walking",
    categoryName: "Pets",
    price: 25,
    rating: 4.6,
    eventType: "Private",
    provider: "Paws & Walks",
    duration: 30,
    description: "A fun and safe dog walking service for your furry friend.",
    specialties: "Daily Walks, Exercise",
    reservationDeadline: new Date('2024-11-29T08:00:00'),
    cancellationDeadline: new Date('2024-11-29T06:00:00')
  },
  {
    id: "18",
    name: "Spa Day Package",
    categoryName: "Health & Wellness",
    price: 150,
    rating: 4.9,
    eventType: "Private",
    provider: "Luxury Spa",
    duration: 180,
    description: "A full day of pampering with massages, facials, and relaxation.",
    specialties: "Deep Tissue Massage, Hot Stone Therapy",
    reservationDeadline: new Date('2024-12-05T16:00:00'),
    cancellationDeadline: new Date('2024-12-05T14:00:00')
  }
]

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
