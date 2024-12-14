import { Category } from "../../category/model/category.model";

export interface EventTypeRequestDto {
    name: string;
    description: string;
    suggestedCategories: Category[];
}