import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MenuItem } from '../model/menu_item';


@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.css'
})
export class DrawerComponent {
  @Input() drawer!: MatSidenav;
  menuItems: MenuItem[] = [];

  ngOnInit(): void {
    const user = sessionStorage.getItem('user');
    if (user) {
      this.menuItems = [
        { label: 'Home', icon: 'home', route: '/home' },
        { label: 'Profile', icon: 'person', route: '/profile' },
        { label: 'Notifications', icon: 'notifications', route: '/notifications' }
      ];
    } else {
      this.menuItems = [
        { label: 'Home', icon: 'home', route: '/home' }
      ];
    }
  }
  
  constructor(private router: Router) {}

  onMenuItemClick(item: any): void {
    this.router.navigate([item.route]); 
    this.drawer.close(); 
  }
}
