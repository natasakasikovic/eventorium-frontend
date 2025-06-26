import { City } from "../../shared/model/city.model";

export interface CompanyRequest {
    name: string;
    address: string;
    city: City;
    phoneNumber: string;
    description: string;
    email: string;
    openingHours: string;
    closingHours: string;
    providerId: number;
}