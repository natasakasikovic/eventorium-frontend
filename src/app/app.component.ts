import { Component, ChangeDetectorRef, NgZone, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean = false;
  drawer: boolean = false;
  constructor() {}

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    const currentUser = sessionStorage.getItem('user');
    this.isLoggedIn = currentUser !== null;
  }

  // openLoginDialog(): void {
  //   const dialogRef = this.dialog.open(LoginComponent, {
  //     width: '450px',
  //     height: 'auto',
  //     disableClose: true,
  //     panelClass: 'custom-dialog-container'
  //   });

  //   dialogRef.componentInstance.loginStatusChanged.subscribe((status: boolean) => {
  //     this.isLoggedIn = status;
  //   });
  // }
}
