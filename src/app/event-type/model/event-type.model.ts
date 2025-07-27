import { Category } from "../../category/model/category.model";

export interface EventType {
    id: number;
    name: string;
    description: string;
    image: string;
    suggestedCategories: Category[];
}
