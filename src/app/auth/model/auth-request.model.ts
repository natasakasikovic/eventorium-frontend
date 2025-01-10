import { PersonRequestDto } from "./person.request.model";
import { Role } from "./user-role.model";

export interface AuthRequestDto {
    email: string;
    password: string;
    passwordConfirmation: string;
    roles: Role[];
    person: PersonRequestDto
}