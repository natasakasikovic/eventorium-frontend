import { PersonRequestDto } from "./person.request.model";
import { Role } from "./user-role.model";

export interface AuthRequestDto {
    email: string;
    password: string;
    confirmPassword: string;
    role: Role[];
    person: PersonRequestDto
}