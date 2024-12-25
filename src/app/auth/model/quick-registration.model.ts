import { QuickRegistrationPersonDto } from "./qucik-registration-person.model";

export interface QuickRegistrationDto {
    email: string;
    password: string;
    passwordConfirmation: string
    person: QuickRegistrationPersonDto
}