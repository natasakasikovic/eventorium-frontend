import {mockCategories} from './category.mock';
import {EventType} from '../../app/event-type/model/event-type.model';

export const mockEventTypes: EventType[] = [
  {
    id: 1,
    name: 'Wedding',
    description: 'Wedding and related celebrations',
    suggestedCategories: [mockCategories[0], mockCategories[1]],
    image: null,
  },
  {
    id: 2,
    name: 'Corporate Event',
    description: 'Business and corporate gatherings',
    suggestedCategories: [mockCategories[1], mockCategories[2]],
    image: null,
  },
  {
    id: 3,
    name: 'Birthday Party',
    description: 'Birthday celebrations and private parties',
    suggestedCategories: [mockCategories[2]],
    image: null,
  },
];
