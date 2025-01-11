import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { MenuItem } from '../model/menu_item';
import { AuthService } from '../../auth/auth.service';

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

  private getMenuItemsForUser(userRole: String|null): MenuItem[] {
    let items: MenuItem[] = [
      { label: 'Home', icon: 'home', route: '/home' }
    ];

    if (userRole) {
      items.push(
        { label: 'Profile', icon: 'person', route: '/account-details' },
        { label: 'Notifications', icon: 'notifications', route: '/notifications' },
        { label: 'Favourites', icon: 'favorite', route: '/favourites' }
      );

      if (userRole === "PROVIDER") {
        items.push({ label: 'Services', icon: 'information', route: '/manageable-services' });
        items.push({ label: 'Products', icon: 'information', route: ''}); // TODO: Change when implemented.
        items.push({ label: 'Price List', icon: 'receipt', route: '/price-list'});
      }

      if (userRole === "EVENT_ORGANIZER") {
      }

      if(userRole === "ADMIN") {
        items.push({ label: 'Categories', icon: 'category', route: '/categories-overview'});
        items.push({ label: 'Category proposals', icon: 'lightbulb', route: '/category-proposals'});
      }
    }

    return items;
  }

  onMenuItemClick(item: MenuItem): void {
    this.router.navigate([item.route]);
    this.drawer.close();
  }
}
