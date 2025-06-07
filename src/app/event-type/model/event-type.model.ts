import { Category } from "../../category/model/category.model";
import {ImageResponseDto} from '../../shared/model/image-response-dto.model';

export interface EventType {
    id: number;
    name: string;
    description: string;
    image: string;
    suggestedCategories: Category[];
}
