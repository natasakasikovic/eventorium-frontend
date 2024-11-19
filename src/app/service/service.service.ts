import {Injectable, OnInit} from '@angular/core';
import {Service} from './model/service.model';
import {Confirmation} from './model/confirmation.enum';

export const services: Service[] = [
  {
    id: '1',
    name: 'Yoga Class',
    categoryName: 'Wellness',
    price: 30,
    rating: 4.7,
    eventType: 'Group',
    provider: 'Wellness Center',
    duration: 60,
    description: 'A relaxing yoga class to improve flexibility and reduce stress.',
    specialties: 'Yoga, Flexibility, Mindfulness',
    reservationDeadline: new Date('2024-12-01T10:00:00'),
    cancellationDeadline: new Date('2024-12-02T10:00:00'),
    discount: 0,
    visible: true,
    available: true,
    confirmation: Confirmation.AUTOMATIC
  },
  {
    id: '2',
    name: 'Cooking Workshop',
    categoryName: 'Lifestyle',
    price: 45,
    rating: 4.5,
    eventType: 'Group',
    provider: 'Culinary Academy',
    duration: 120,
    description: 'Learn how to make gourmet dishes from top chefs.',
    specialties: 'Cooking, Baking, Gourmet',
    reservationDeadline: new Date('2024-11-20T08:00:00'),
    cancellationDeadline: new Date('2024-11-21T08:00:00'),
    discount: 0,
    visible: true,
    available: true,
    confirmation: Confirmation.AUTOMATIC
  },
  {
    id: '3',
    name: 'Dance Party',
    categoryName: 'Entertainment',
    price: 20,
    rating: 4.2,
    eventType: 'Social',
    provider: 'Party Hub',
    duration: 180,
    description: 'A fun night of dancing to your favorite hits.',
    specialties: 'Dance, Social, Music',
    reservationDeadline: new Date('2024-12-15T18:00:00'),
    cancellationDeadline: new Date('2024-12-16T18:00:00'),
    discount: 0,
    visible: true,
    available: true,
    confirmation: Confirmation.MANUAL
  },
  {
    id: '4',
    name: 'Painting Class',
    categoryName: 'Arts',
    price: 40,
    rating: 4.8,
    eventType: 'Group',
    provider: 'Art Studio',
    duration: 90,
    description: 'Express your creativity through painting with step-by-step instructions.',
    specialties: 'Art, Painting, Creativity',
    reservationDeadline: new Date('2024-11-22T09:00:00'),
    cancellationDeadline: new Date('2024-11-23T09:00:00'),
    discount: 0,
    visible: true,
    available: true,
    confirmation: Confirmation.MANUAL
  },
  {
    id: '5',
    name: 'Photography Class',
    categoryName: 'Creative',
    price: 60,
    rating: 4.9,
    eventType: 'Group',
    provider: 'Creative Academy',
    duration: 120,
    description: 'Master the art of photography with professional tips and techniques.',
    specialties: 'Photography, Creativity, Visual Arts',
    reservationDeadline: new Date('2024-11-30T10:00:00'),
    cancellationDeadline: new Date('2024-12-01T10:00:00'),
    discount: 0,
    visible: true,
    available: true,
    confirmation: Confirmation.MANUAL
  },
  {
    id: '6',
    name: 'Music Concert',
    categoryName: 'Entertainment',
    price: 50,
    rating: 4.6,
    eventType: 'Concert',
    provider: 'Live Events',
    duration: 150,
    description: 'A live concert featuring popular bands and performers.',
    specialties: 'Music, Live Event, Concert',
    reservationDeadline: new Date('2024-12-10T15:00:00'),
    cancellationDeadline: new Date('2024-12-11T15:00:00'),
    discount: 0,
    visible: true,
    available: true,
    confirmation: Confirmation.MANUAL
  },
  {
    id: '7',
    name: 'Personal Training Session',
    categoryName: 'Fitness',
    price: 70,
    rating: 5.0,
    eventType: 'Individual',
    provider: 'Fitness Pro',
    duration: 60,
    description: 'One-on-one personal training to help you achieve your fitness goals.',
    specialties: 'Fitness, Health, Personal Training',
    reservationDeadline: new Date('2024-11-25T07:00:00'),
    cancellationDeadline: new Date('2024-11-26T07:00:00'),
    discount: 0,
    visible: true,
    available: true,
    confirmation: Confirmation.AUTOMATIC
  },
  {
    id: '8',
    name: 'Weekend Getaway',
    categoryName: 'Travel',
    price: 200,
    rating: 4.4,
    eventType: 'Trip',
    provider: 'Holiday Retreats',
    duration: 48,
    description: 'A two-day getaway to relax and rejuvenate.',
    specialties: 'Travel, Weekend, Relaxation',
    reservationDeadline: new Date('2024-12-05T09:00:00'),
    cancellationDeadline: new Date('2024-12-06T09:00:00'),
    discount: 0,
    visible: true,
    available: true,
    confirmation: Confirmation.AUTOMATIC
  },
  {
    id: '9',
    name: 'Guitar Lessons',
    categoryName: 'Music',
    price: 30,
    rating: 4.6,
    eventType: 'Individual',
    provider: 'Music Academy',
    duration: 45,
    description: 'Learn to play guitar with personalized lessons.',
    specialties: 'Music, Guitar, Lessons',
    reservationDeadline: new Date('2024-11-28T08:00:00'),
    cancellationDeadline: new Date('2024-11-29T08:00:00'),
    discount: 0,
    visible: true,
    available: true,
    confirmation: Confirmation.AUTOMATIC
  },
  {
    id: '10',
    name: 'Martial Arts Training',
    categoryName: 'Fitness',
    price: 50,
    rating: 4.3,
    eventType: 'Group',
    provider: 'Martial Arts Academy',
    duration: 90,
    description: 'Join our martial arts class and build strength and discipline.',
    specialties: 'Fitness, Martial Arts, Strength',
    reservationDeadline: new Date('2024-12-03T11:00:00'),
    cancellationDeadline: new Date('2024-12-04T11:00:00'),
    discount: 0,
    visible: true,
    available: true,
    confirmation: Confirmation.AUTOMATIC
  },
  {
    id: '11',
    name: 'Spinning Class',
    categoryName: 'Fitness',
    price: 25,
    rating: 4.8,
    eventType: 'Group',
    provider: 'Fitness Center',
    duration: 45,
    description: 'High-intensity cycling workout to get your heart racing.',
    specialties: 'Fitness, Spinning, Cardio',
    reservationDeadline: new Date('2024-12-12T07:00:00'),
    cancellationDeadline: new Date('2024-12-13T07:00:00'),
    discount: 0,
    visible: true,
    available: true,
    confirmation: Confirmation.MANUAL
  },
  {
    id: '12',
    name: 'Wine Tasting',
    categoryName: 'Lifestyle',
    price: 40,
    rating: 4.7,
    eventType: 'Group',
    provider: 'Vineyard Tours',
    duration: 90,
    description: 'Taste a selection of fine wines and learn about the process.',
    specialties: 'Wine, Tasting, Lifestyle',
    reservationDeadline: new Date('2024-11-29T16:00:00'),
    cancellationDeadline: new Date('2024-11-30T16:00:00'),
    discount: 0,
    visible: true,
    available: true,
    confirmation: Confirmation.MANUAL
  },
  {
    id: '13',
    name: 'Outdoor Adventure',
    categoryName: 'Adventure',
    price: 120,
    rating: 4.5,
    eventType: 'Trip',
    provider: 'Adventure Tours',
    duration: 180,
    description: 'Explore the great outdoors with an exciting adventure.',
    specialties: 'Adventure, Outdoors, Hiking',
    reservationDeadline: new Date('2024-12-14T10:00:00'),
    cancellationDeadline: new Date('2024-12-15T10:00:00'),
    discount: 0,
    visible: true,
    available: true,
    confirmation: Confirmation.MANUAL
  },
  {
    id: '14',
    name: 'Stand-Up Comedy Show',
    categoryName: 'Entertainment',
    price: 35,
    rating: 4.3,
    eventType: 'Social',
    provider: 'Comedy Club',
    duration: 120,
    description: 'Laugh out loud at a stand-up comedy show with top comedians.',
    specialties: 'Comedy, Stand-Up, Entertainment',
    reservationDeadline: new Date('2024-11-25T19:00:00'),
    cancellationDeadline: new Date('2024-11-26T19:00:00'),
    discount: 0,
    visible: true,
    available: true,
    confirmation: Confirmation.MANUAL
  },
  {
    id: '15',
    name: 'Horseback Riding',
    categoryName: 'Adventure',
    price: 90,
    rating: 4.6,
    eventType: 'Individual',
    provider: 'Equestrian Center',
    duration: 120,
    description: 'Enjoy a scenic horseback ride through beautiful trails.',
    specialties: 'Adventure, Horseback Riding, Outdoors',
    reservationDeadline: new Date('2024-12-08T11:00:00'),
    cancellationDeadline: new Date('2024-12-09T11:00:00'),
    discount: 0,
    visible: true,
    available: true,
    confirmation: Confirmation.AUTOMATIC
  },
  {
    id: '16',
    name: 'Spa Day',
    categoryName: 'Wellness',
    price: 150,
    rating: 4.9,
    eventType: 'Individual',
    provider: 'Luxury Spa',
    duration: 240,
    description: 'Indulge in a full day of relaxation with spa treatments.',
    specialties: 'Wellness, Spa, Relaxation',
    reservationDeadline: new Date('2024-11-30T08:00:00'),
    cancellationDeadline: new Date('2024-12-01T08:00:00'),
    discount: 0,
    visible: true,
    available: true,
    confirmation: Confirmation.AUTOMATIC
  },
  {
    id: '17',
    name: 'Language Course',
    categoryName: 'Education',
    price: 120,
    rating: 4.6,
    eventType: 'Group',
    provider: 'Language School',
    duration: 180,
    description: 'Learn a new language with expert teachers.',
    specialties: 'Education, Language, Course',
    reservationDeadline: new Date('2024-12-02T10:00:00'),
    cancellationDeadline: new Date('2024-12-03T10:00:00'),
    discount: 0,
    visible: true,
    available: true,
    confirmation: Confirmation.AUTOMATIC
  },
  {
    id: '18',
    name: 'Guided City Tour',
    categoryName: 'Travel',
    price: 50,
    rating: 4.7,
    eventType: 'Trip',
    provider: 'City Tours',
    duration: 120,
    description: 'Explore the sights of the city with a knowledgeable guide.',
    specialties: 'Travel, Guided Tour, City Exploration',
    reservationDeadline: new Date('2024-12-06T14:00:00'),
    cancellationDeadline: new Date('2024-12-07T14:00:00'),
    discount: 0,
    visible: true,
    available: true,
    confirmation: Confirmation.AUTOMATIC
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

  update(id: string, service: Service): void {
    const oldService: Service = this.get(id);
    oldService.visible = service.visible;
    oldService.name = service.name;
    oldService.price = service.price;
    oldService.confirmation = service.confirmation;
    oldService.available = service.available;
    oldService.cancellationDeadline = service.cancellationDeadline;
    oldService.specialties = service.specialties;
    oldService.description = service.description;
    oldService.duration = service.duration;
    oldService.discount = service.discount;
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
