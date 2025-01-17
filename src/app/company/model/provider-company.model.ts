import { City } from "../../shared/model/city.model";

export interface ProviderCompany {
    id: number;
    name: string;
    description: string;
    phoneNumber: string;
    email: string;
    address: string;
    city: City;
    openingHours: string;
    closingHours: string;
    images: string[];
}