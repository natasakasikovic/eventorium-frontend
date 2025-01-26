import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../event.service';
import { EventDetails } from '../model/event-details.model';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../../shared/info-dialog/info-dialog.component';
import { AuthService } from '../../auth/auth.service';
import { UserDetails } from '../../user/model/user-details.model';
import { ChatDialogService } from '../../shared/chat-dialog/chat-dialog.service';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})
export class EventDetailsComponent implements OnInit {
  id: number;
  event: EventDetails;
  isFavourite: boolean;

  constructor(
    private route: ActivatedRoute,
    private service: EventService,
    private dialog: MatDialog,
    private authService: AuthService,
    private chatService: ChatDialogService
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');

    this.service.getEvent(this.id).pipe(
      switchMap((event: EventDetails) => {
        this.event = event;

        if (this.loggedIn) return this.service.isFavourite(this.id);
        else return of(false);

      })
    ).subscribe({
      next: (isFav: boolean) => {
        this.isFavourite = isFav;
      },
      error: (_) => {
        this.showMessage("", "An error occurred while loading event details. Try again later.");
      }
    });
  }

  showMessage(title: string, message: string) : void {
    this.dialog.open(InfoDialogComponent, {
      data: {
        title: title,
        message: message
      }
    })
  }

  get loggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  openChatDialog(recipient?: UserDetails): void {
    this.chatService.openChatDialog(recipient ? recipient : this.event.organizer);
  }

  toggleFavourite() {
    if (this.isFavourite) this.removeFromFavourites();
    else this.addToFavourites();
  }

  addToFavourites(): void {
    this.service.addToFavourites(this.id).subscribe({
      next: (_) => {
        this.isFavourite = true;
      }
    })
  }

  removeFromFavourites(): void {
    this.service.removeFromFavourites(this.id).subscribe({
      next: (_) => {
        this.isFavourite = false;
      }
    })
  }
}
