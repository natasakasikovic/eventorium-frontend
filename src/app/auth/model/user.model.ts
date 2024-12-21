import { Person } from "./person.model";
import { Role } from "./user-role.model";

export interface User {
    id?: number;
    email: string;
    password: string;
    role?: Role;
    activated?: boolean;
    suspended?: boolean;
    activationTimestamp?: Date;
    person?: Person
}
