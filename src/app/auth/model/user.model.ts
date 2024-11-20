import { Person } from "./person.model";
import { UserRole } from "./user-role.enum";

export interface User {
    id?: number;
    email: string;
    password: string;
    role?: UserRole;
    activated?: boolean;
    suspended?: boolean;
    activationTimestamp?: Date;
    person?: Person
}
