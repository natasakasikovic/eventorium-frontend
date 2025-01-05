import { City } from "../../shared/model/city.model";

export interface Person {
    name: string,
    lastname: string,
    address: string,
    phoneNumber: string,
    city: City
}