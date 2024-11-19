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
      image: "wedding.jpg"
  },
  {
      id: 4,
      name: "Art Fair",
      location: "New York, NY",
      image: "wedding.jpg"
  },
  {
      id: 5,
      name: "Food Carnival",
      location: "Chicago, IL",
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
    return events;
  }

}

