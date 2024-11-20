import { Injectable } from '@angular/core';
import { Event } from './model/event.model';

const events: Event[] = [
  {
      id: 1,
      name: "Wedding",
      location: "Los Angeles, CA",
      image: "wedding.jpg"
  },
  {
      id: 2,
      name: "Music Festival",
      location: "Austin, TX",
      image: "wedding.jpg"
  },
  {
      id: 3,
      name: "Tech Conference",
      location: "San Francisco, CA",
      image: "balloons.jpg"
  },
  {
      id: 4,
      name: "Art Fair",
      location: "New York, NY",
      image: "balloons.jpg"
  },
  {
      id: 5,
      name: "Food Carnival",
      location: "Chicago, IL",
      image: "wedding.jpg"
  },
  {
      id: 6,
      name: "Sports Tournament",
      location: "Miami, FL",
      image: "wedding.jpg"
  },
  {
      id: 7,
      name: "Book Fair",
      location: "Seattle, WA",
      image: "wedding.jpg"
  },
  {
      id: 8,
      name: "Film Screening",
      location: "Hollywood, CA",
      image: "wedding.jpg"
  },
  {
      id: 9,
      name: "Fashion Show",
      location: "Paris, France",
      image: "wedding.jpg"
  },
  {
      id: 10,
      name: "Gaming Expo",
      location: "Las Vegas, NV",
      image: "balloons.jpg"
  },
  {
      id: 11,
      name: "Charity Gala",
      location: "London, UK",
      image: "wedding.jpg"
  },
  {
      id: 12,
      name: "Startup Meetup",
      location: "Berlin, Germany",
      image: "balloons.jpg"
  },
  {
      id: 13,
      name: "Photography Workshop",
      location: "Toronto, Canada",
      image: "wedding.jpg"
  },
  {
      id: 14,
      name: "Yoga Retreat",
      location: "Bali, Indonesia",
      image: "balloons.jpg"
  },
  {
      id: 15,
      name: "Beer Festival",
      location: "Munich, Germany",
      image: "wedding.jpg"
  },
  {
    id: 16,
    name: "Beer Festival",
    location: "Munich, Germany",
    image: "wedding.jpg"
  },
  {
    id: 17,
    name: "Beer Festival",
    location: "Munich, Germany",
    image: "wedding.jpg"
  },
  {
    id: 18,
    name: "Yoga Retreat",
    location: "Bali, Indonesia",
    image: "balloons.jpg"
  }, 
  {
    id: 19,
    name: "Photography Workshop",
    location: "Toronto, Canada",
    image: "wedding.jpg"
},
{
  id: 20,
  name: "Photography Workshop",
  location: "Toronto, Canada",
  image: "wedding.jpg"
},
{
  id: 21,
  name: "Photography Workshop",
  location: "Toronto, Canada",
  image: "wedding.jpg"
}
];

@Injectable({
  providedIn: 'root'
})

export class EventService {

  private events: Event[] = []

  constructor() {
    for(let event of events) {
      this.events.push(event);
    }
  }

  getTopEvents(): Event[] {
    return this.events.slice(0, 5);
  }

  totalCountEvents(): number {
    return this.events.length;
  }

  getPage(size: number, index: number): Event[] {
    return this.events.slice(index * size, index * size + size);
  }

  searchEvents(keyword: string): Event[] {
    return this.events.filter(service => service.name.toLowerCase().includes(keyword.toLowerCase()));
  }

}

