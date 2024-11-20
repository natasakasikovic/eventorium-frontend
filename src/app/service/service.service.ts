import {Injectable, OnInit} from '@angular/core';
import {Service} from './model/service.model';
import {Confirmation} from './model/confirmation.enum';
import {ServiceFilter} from './model/filter-service-options.model';

export const services: Service[] = [
  {
    id: '1',
    name: 'Yoga Class',
    categoryName: 'Wellness',
    price: 30,
    rating: 4.7,
    eventTypes: ['Group'],
    provider: 'Wellness Center',
    minDuration: 1,
    maxDuration: 2,
    description: 'A relaxing yoga class to improve flexibility and reduce stress.',
    specialties: 'Yoga, Flexibility, Mindfulness',
    reservationDeadline: new Date('2024-12-01T10:00:00'),
    cancellationDeadline: new Date('2024-12-02T10:00:00'),
    discount: 0,
    visible: true,
    available: true,
    confirmation: Confirmation.AUTOMATIC,
    image: 'wedding.jpg'
  },
  {
    id: '2',
    name: 'Cooking Workshop',
    categoryName: 'Lifestyle',
    price: 45,
    rating: 4.5,
    eventTypes: ['Group'],
    provider: 'Culinary Academy',
    minDuration: 2,
    maxDuration: 4,
    description: 'Learn how to make gourmet dishes from top chefs.',
    specialties: 'Cooking, Baking, Gourmet',
    reservationDeadline: new Date('2024-11-20T08:00:00'),
    cancellationDeadline: new Date('2024-11-21T08:00:00'),
    discount: 0,
    visible: true,
    available: true,
    confirmation: Confirmation.AUTOMATIC,
    image: 'wedding.jpg'
  },
  {
    id: '3',
    name: 'Dance Party',
    categoryName: 'Entertainment',
    price: 20,
    rating: 4.2,
    eventTypes: ['Social'],
    provider: 'Party Hub',
    minDuration: 3,
    maxDuration: 5,
    description: 'A fun night of dancing to your favorite hits.',
    specialties: 'Dance, Social, Music',
    reservationDeadline: new Date('2024-12-15T18:00:00'),
    cancellationDeadline: new Date('2024-12-16T18:00:00'),
    discount: 0,
    visible: true,
    available: false,
    confirmation: Confirmation.MANUAL,
    image: 'wedding.jpg'
  },
  {
    id: '4',
    name: 'Painting Class',
    categoryName: 'Arts',
    price: 40,
    rating: 4.8,
    eventTypes: ['Group'],
    provider: 'Art Studio',
    minDuration: 1,
    maxDuration: 2,
    description: 'Express your creativity through painting with step-by-step instructions.',
    specialties: 'Art, Painting, Creativity',
    reservationDeadline: new Date('2024-11-22T09:00:00'),
    cancellationDeadline: new Date('2024-11-23T09:00:00'),
    discount: 0,
    visible: true,
    available: true,
    confirmation: Confirmation.MANUAL,
    image: 'wedding.jpg'
  },
  {
    id: '5',
    name: 'Photography Class',
    categoryName: 'Creative',
    price: 60,
    rating: 4.9,
    eventTypes: ['Group'],
    provider: 'Creative Academy',
    minDuration: 2,
    maxDuration: 3,
    description: 'Master the art of photography with professional tips and techniques.',
    specialties: 'Photography, Creativity, Visual Arts',
    reservationDeadline: new Date('2024-11-30T10:00:00'),
    cancellationDeadline: new Date('2024-12-01T10:00:00'),
    discount: 0,
    visible: true,
    available: true,
    confirmation: Confirmation.MANUAL,
    image: 'wedding.jpg'
  },
  {
    id: '6',
    name: 'Music Concert',
    categoryName: 'Entertainment',
    price: 50,
    rating: 4.6,
    eventTypes: ['Concert'],
    provider: 'Live Events',
    minDuration: 2,
    maxDuration: 3,
    description: 'A live concert featuring popular bands and performers.',
    specialties: 'Music, Live Event, Concert',
    reservationDeadline: new Date('2024-12-10T15:00:00'),
    cancellationDeadline: new Date('2024-12-11T15:00:00'),
    discount: 0,
    visible: true,
    available: true,
    confirmation: Confirmation.MANUAL,
    image: 'wedding.jpg'
  },
  {
    id: '7',
    name: 'Personal Training',
    categoryName: 'Fitness',
    price: 70,
    rating: 5.0,
    eventTypes: ['Individual'],
    provider: 'Fitness Pro',
    minDuration: 1,
    maxDuration: 2,
    description: 'One-on-one personal training to help you achieve your fitness goals.',
    specialties: 'Fitness, Health, Personal Training',
    reservationDeadline: new Date('2024-11-25T07:00:00'),
    cancellationDeadline: new Date('2024-11-26T07:00:00'),
    discount: 0,
    visible: true,
    available: true,
    confirmation: Confirmation.AUTOMATIC,
    image: 'wedding.jpg'
  },
  {
    id: '8',
    name: 'Weekend Getaway',
    categoryName: 'Travel',
    price: 200,
    rating: 4.4,
    eventTypes: ['Trip'],
    provider: 'Holiday Retreats',
    minDuration: 2,
    maxDuration: 3,
    description: 'A two-day getaway to relax and rejuvenate.',
    specialties: 'Travel, Weekend, Relaxation',
    reservationDeadline: new Date('2024-12-05T09:00:00'),
    cancellationDeadline: new Date('2024-12-06T09:00:00'),
    discount: 0,
    visible: true,
    available: true,
    confirmation: Confirmation.AUTOMATIC,
    image: 'wedding.jpg'
  },
  {
    id: '9',
    name: 'Guitar Lessons',
    categoryName: 'Music',
    price: 30,
    rating: 4.6,
    eventTypes: ['Individual'],
    provider: 'Music Academy',
    minDuration: 1,
    maxDuration: 2,
    description: 'Learn to play guitar with personalized lessons.',
    specialties: 'Music, Guitar, Lessons',
    reservationDeadline: new Date('2024-11-28T08:00:00'),
    cancellationDeadline: new Date('2024-11-29T08:00:00'),
    discount: 0,
    visible: true,
    available: true,
    confirmation: Confirmation.AUTOMATIC,
    image: 'wedding.jpg'
  },
  {
    id: '10',
    name: 'Martial Arts Training',
    categoryName: 'Fitness',
    price: 50,
    rating: 4.3,
    eventTypes: ['Group'],
    provider: 'Martial Arts Academy',
    minDuration: 1,
    maxDuration: 2,
    description: 'Join our martial arts class and build strength and discipline.',
    specialties: 'Fitness, Martial Arts, Strength',
    reservationDeadline: new Date('2024-12-03T11:00:00'),
    cancellationDeadline: new Date('2024-12-04T11:00:00'),
    discount: 0,
    visible: true,
    available: true,
    confirmation: Confirmation.AUTOMATIC,
    image: 'wedding.jpg'
  },
  {
    id: '11',
    name: 'Spinning Class',
    categoryName: 'Fitness',
    price: 25,
    rating: 4.8,
    eventTypes: ['Group'],
    provider: 'Fitness Center',
    minDuration: 1,
    maxDuration: 2,
    description: 'High-intensity cycling workout to get your heart racing.',
    specialties: 'Fitness, Spinning, Cardio',
    reservationDeadline: new Date('2024-12-12T07:00:00'),
    cancellationDeadline: new Date('2024-12-13T07:00:00'),
    discount: 0,
    visible: true,
    available: true,
    confirmation: Confirmation.MANUAL,
    image: 'wedding.jpg'
  },
  {
    id: '12',
    name: 'Wine Tasting',
    categoryName: 'Lifestyle',
    price: 40,
    rating: 4.7,
    eventTypes: ['Group'],
    provider: 'Vineyard Tours',
    minDuration: 1,
    maxDuration: 2,
    description: 'Taste a selection of fine wines and learn about the process.',
    specialties: 'Wine, Tasting, Lifestyle',
    reservationDeadline: new Date('2024-11-29T16:00:00'),
    cancellationDeadline: new Date('2024-11-30T16:00:00'),
    discount: 0,
    visible: true,
    available: true,
    confirmation: Confirmation.MANUAL,
    image: 'wedding.jpg'
  },
  {
    id: '13',
    name: 'Outdoor Adventure',
    categoryName: 'Adventure',
    price: 120,
    rating: 4.5,
    eventTypes: ['Trip'],
    provider: 'Adventure Tours',
    minDuration: 3,
    maxDuration: 5,
    description: 'Explore the great outdoors with an exciting adventure.',
    specialties: 'Adventure, Outdoors, Hiking',
    reservationDeadline: new Date('2024-12-14T10:00:00'),
    cancellationDeadline: new Date('2024-12-15T10:00:00'),
    discount: 0,
    visible: true,
    available: true,
    confirmation: Confirmation.MANUAL,
    image: 'wedding.jpg'
  },
  {
    id: '14',
    name: 'Massage Therapy',
    categoryName: 'Entertainment',
    price: 35,
    rating: 4.3,
    eventTypes: ['Social'],
    provider: 'Comedy Club',
    minDuration: 1,
    maxDuration: 5,
    description: 'Laugh out loud at a stand-up comedy show with top comedians.',
    specialties: 'Comedy, Stand-Up, Entertainment',
    reservationDeadline: new Date('2024-11-25T19:00:00'),
    cancellationDeadline: new Date('2024-11-26T19:00:00'),
    discount: 0,
    visible: true,
    available: true,
    confirmation: Confirmation.MANUAL,
    image: 'wedding.jpg'
  },
  {
    id: '15',
    name: 'Horseback Riding',
    categoryName: 'Adventure',
    price: 90,
    rating: 4.6,
    eventTypes: ['Individual'],
    provider: 'Equestrian Center',
    minDuration: 10,
    maxDuration: 23,
    description: 'Enjoy a scenic horseback ride through beautiful trails.',
    specialties: 'Adventure, Horseback Riding, Outdoors',
    reservationDeadline: new Date('2024-12-08T11:00:00'),
    cancellationDeadline: new Date('2024-12-09T11:00:00'),
    discount: 0,
    visible: true,
    available: true,
    confirmation: Confirmation.AUTOMATIC,
    image: 'wedding.jpg'
  },
  {
    id: '16',
    name: 'Spa Day',
    categoryName: 'Wellness',
    price: 90,
    rating: 4.6,
    eventTypes: ['Individual'],
    provider: 'Wellness Spa',
    minDuration: 1,
    maxDuration: 1,
    description: 'Relax with a soothing massage therapy session.',
    specialties: 'Massage, Relaxation, Wellness',
    reservationDeadline: new Date('2024-11-25T13:00:00'),
    cancellationDeadline: new Date('2024-11-26T13:00:00'),
    discount: 0,
    visible: true,
    available: true,
    confirmation: Confirmation.MANUAL,
    image: 'wedding.jpg'
  }, 
  {
    id: '17',
    name: 'Comedy Night',
    categoryName: 'Entertainment',
    price: 25,
    rating: 4.9,
    eventTypes: ['Social'],
    provider: 'Comedy Club',
    minDuration: 2,
    maxDuration: 3,
    description: 'Laugh out loud at a stand-up comedy show with top comedians.',
    specialties: 'Comedy, Entertainment, Social',
    reservationDeadline: new Date('2024-12-06T19:00:00'),
    cancellationDeadline: new Date('2024-12-07T19:00:00'),
    discount: 0,
    visible: true,
    available: true,
    confirmation: Confirmation.MANUAL,
    image: 'balloons.jpg'
  },
  {
    id: '18',
    name: 'Rock Climbing',
    categoryName: 'Adventure',
    price: 75,
    rating: 4.7,
    eventTypes: ['Group'],
    provider: 'Climb Center',
    minDuration: 2,
    maxDuration: 4,
    description: 'Challenge yourself with an exciting rock climbing experience.',
    specialties: 'Adventure, Climbing, Fitness',
    reservationDeadline: new Date('2024-12-10T10:00:00'),
    cancellationDeadline: new Date('2024-12-11T10:00:00'),
    discount: 0,
    visible: true,
    available: true,
    confirmation: Confirmation.MANUAL,
    image: 'balloons.jpg'
  },
  {
    id: '19',
    name: 'Cooking Class',
    categoryName: 'Lifestyle',
    price: 40,
    rating: 4.4,
    eventTypes: ['Group'],
    provider: 'Kitchen Academy',
    minDuration: 3,
    maxDuration: 4,
    description: 'Learn basic cooking skills in a hands-on class.',
    specialties: 'Cooking, Lifestyle, Beginner',
    reservationDeadline: new Date('2024-12-12T08:00:00'),
    cancellationDeadline: new Date('2024-12-13T08:00:00'),
    discount: 0,
    visible: true,
    available: true,
    confirmation: Confirmation.MANUAL,
    image: 'balloons.jpg'
  },
  {
    id: '20',
    name: 'Pottery Workshop',
    categoryName: 'Arts',
    price: 50,
    rating: 4.8,
    eventTypes: ['Group'],
    provider: 'Clay Studio',
    minDuration: 2,
    maxDuration: 3,
    description: 'Learn pottery techniques and create your own masterpiece.',
    specialties: 'Pottery, Arts, Creativity',
    reservationDeadline: new Date('2024-12-08T09:00:00'),
    cancellationDeadline: new Date('2024-12-09T09:00:00'),
    discount: 0,
    visible: true,
    available: true,
    confirmation: Confirmation.AUTOMATIC,
    image: 'balloons.jpg'
  },
  {
    id: '21',
    name: 'Wine and Paint Night',
    categoryName: 'Lifestyle',
    price: 35,
    rating: 4.9,
    eventTypes: ['Social'],
    provider: 'Creative Events',
    minDuration: 2,
    maxDuration: 3,
    description: 'Enjoy painting while sipping on fine wine in a social setting.',
    specialties: 'Painting, Wine, Social',
    reservationDeadline: new Date('2024-12-20T18:00:00'),
    cancellationDeadline: new Date('2024-12-21T18:00:00'),
    discount: 0,
    visible: true,
    available: true,
    confirmation: Confirmation.MANUAL,
    image: 'balloons.jpg'
  },
  {
    id: '22',
    name: 'Cycling Tour',
    categoryName: 'Adventure',
    price: 100,
    rating: 4.6,
    eventTypes: ['Trip'],
    provider: 'Outdoor Adventures',
    minDuration: 4,
    maxDuration: 6,
    description: 'Explore scenic trails on a guided cycling tour.',
    specialties: 'Cycling, Adventure, Outdoors',
    reservationDeadline: new Date('2024-12-15T07:00:00'),
    cancellationDeadline: new Date('2024-12-16T07:00:00'),
    discount: 0,
    visible: true,
    available: true,
    confirmation: Confirmation.AUTOMATIC,
    image: 'balloons.jpg'
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

  getTopServices(): Service[] {
    return services.slice(0, 5);
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
    oldService.minDuration = service.minDuration;
    oldService.maxDuration = service.maxDuration;
    oldService.discount = service.discount;
  }

  getPage(size: number, index: number): Service[] {
    return this.services.slice(index * size, index * size + size);
  }

  create(service: Service): void {
    this.services.push(service);
  }

  get(id: string): Service {
    return this.services.find(service => service.id == id);
  }

  delete(id: string) {
    this.services = this.services.filter(service => service.id !== id);
  }

  filterServices(serviceFilter: ServiceFilter): Service[] {
    return services.filter(service => {
      if (serviceFilter.category && service.categoryName !== serviceFilter.category) return false;
      if (serviceFilter.eventType && serviceFilter.eventType in service.eventTypes) return false;
      if (serviceFilter.available !== null && serviceFilter.available !== undefined
        && (service.available == false && serviceFilter.available == true)) return false;
      if (serviceFilter.minPrice !== null && serviceFilter.minPrice !== undefined
        && service.price < serviceFilter.minPrice) return false;
      return !(serviceFilter.maxPrice !== null && serviceFilter.maxPrice !== undefined
        && service.price > serviceFilter.maxPrice);
    });
  }

  searchServices(keyword: string): Service[] {
    return this.services.filter(service => service.name.toLowerCase().includes(keyword.toLowerCase()));
  }

}
