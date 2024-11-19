import { Injectable } from '@angular/core';
import { User } from '../auth/model/user.model';
import { UserRole } from '../../app/auth/model/user-role.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private users: User[] = [
    {
      id: 1,
      email: 'pup@gmail.com',
      password: 'pup',
      role: UserRole.SPP,
      activated: true,
      suspended: false,
      activationTimestamp: new Date('2024-01-01T12:00:00'),
      person: {
        id: 1,
        name: 'John',
        lastname: 'Doe',
        phoneNumber: '123456789',
        address: '123 Main St',
        city: 'New York'
      }
    },
    {
      id: 2,
      email: 'smith@gmail.com',
      password: 'password123',
      role: UserRole.EO,
      activated: true,
      suspended: false,
      activationTimestamp: new Date('2024-01-02T12:00:00'),
      person: {
        id: 2,
        name: 'Jane',
        lastname: 'Smith',
        phoneNumber: '987654321',
        address: '456 Elm St',
        city: 'Los Angeles'
      }
    }
  ];

  constructor() {}

  login(email: string, password: string): string | User {
    const user = this.users.find(u => u.email === email);

    if (!user) {
      return 'No account found with this email address.';
    }

    if (user.password !== password) {
      return 'The password you entered is incorrect. Please try again.'; 
    }

    return user;
  }
}
