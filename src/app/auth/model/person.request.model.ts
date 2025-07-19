import { City } from "../../shared/model/city.model";

export interface PersonRequest {
    name: string;
    lastname: string;
    phoneNumber: string;
    address: string;
    city: City;
    profilePhoto?: string;
}
