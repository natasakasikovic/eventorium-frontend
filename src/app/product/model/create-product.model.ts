import { Category } from "../../category/model/category.model";
import { EventType } from "../../event-type/model/event-type.model";

export interface CreateProduct {
    name: string;
    description: string;
    price: number;
    discount: number;
    eventTypes: EventType[];
    category: Category;
    isVisible: boolean;
    isAvailable: boolean;
}