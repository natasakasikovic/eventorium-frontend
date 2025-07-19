import {categoriesMock} from './category.mock';
import {EventType} from '../../app/event-type/model/event-type.model';

export const eventTypesMock: EventType[] = [
  {
    id: 1,
    name: 'Wedding',
    description: 'Wedding and related celebrations',
    suggestedCategories: [categoriesMock[0], categoriesMock[1]],
    image: null,
  },
  {
    id: 2,
    name: 'Corporate Event',
    description: 'Business and corporate gatherings',
    suggestedCategories: [categoriesMock[1], categoriesMock[2]],
    image: null,
  },
  {
    id: 3,
    name: 'Birthday Party',
    description: 'Birthday celebrations and private parties',
    suggestedCategories: [categoriesMock[2]],
    image: null,
  },
];
