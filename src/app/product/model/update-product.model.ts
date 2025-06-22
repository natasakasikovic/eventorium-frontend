export interface UpdateProductRequest {
    name: string;
    description: string;
    price: number;
    discount: number;
    eventTypesIds: number[];
    available: boolean;
    visible: boolean;
}