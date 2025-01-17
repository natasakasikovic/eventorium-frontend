export interface ProductFilter {
    name: string;
    description: string;
    type: string;
    category: string;
    availability: boolean;
    minPrice: number;
    maxPrice: number;
}