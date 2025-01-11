import { City } from "../../shared/model/city.model";

export interface AccountDetails {
    id: number,
    email: string,
    name: string,
    lastname: string,
    city: City,
    address: string,
    phoneNumber: string,
    role: string,
    profilePhoto: string
}