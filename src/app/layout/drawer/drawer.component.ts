import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { MenuItem } from '../model/menu_item';
import { AuthService } from '../../auth/auth.service';
import { UserRole } from '../../auth/model/user-role.enum';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css']
})
export class DrawerComponent {
  @Input() drawer!: MatSidenav;
  menuItems: MenuItem[] = [];

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.menuItems = this.getMenuItemsForUser(user);
    });
  }

  private getMenuItemsForUser(user: any): MenuItem[] {
    let items: MenuItem[] = [
      { label: 'Home', icon: 'home', route: '/home' }
    ];

    if (user) {
      // NOTE: If you add an option for authenticated user, add it here
      items.push(
        { label: 'Profile', icon: 'person', route: '/profile' },
        { label: 'Notifications', icon: 'notifications', route: '/notifications' },
        { label: 'Favourites', icon: 'favorite', route: '/favourites' }
      );

      if (user.role === UserRole.SPP) {
        // NOTE: If you add an option for a provider, add it here
        items.push({ label: 'Services', icon: 'information', route: '/manageable-services' });
      }
      
      if (user.role == UserRole.EO) {
        // NOTE: If you add an option for an event organizer, add it here
        // for example:
        // items.push({ label: 'Events', icon: 'event', route: '/events' });
      }
    }

    return items;
  }

  onMenuItemClick(item: MenuItem): void {
    this.router.navigate([item.route]); 
    this.drawer.close(); 
  }
}
