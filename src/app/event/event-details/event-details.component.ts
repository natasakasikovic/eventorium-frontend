import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../event.service';
import { EventDetails } from '../model/event-details.model';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../../shared/info-dialog/info-dialog.component';
import { AuthService } from '../../auth/auth.service';
import { UserDetails } from '../../user/model/user-details.model';
import { ChatDialogService } from '../../shared/chat-dialog/chat-dialog.service';
import { forkJoin, Observable, of, switchMap } from 'rxjs';
import { MESSAGES } from '../../shared/constants/messages';
import { ERROR_MESSAGES } from '../../shared/constants/error-messages';
import { Activity } from '../model/activity.model';
import { RatingService } from '../../review/rating.service';
import { ReviewType } from '../../review/model/review-type.enum';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})
export class EventDetailsComponent implements OnInit {
  id: number;
  event: EventDetails;
  isFavourite: boolean;
  displayedColumns: string[] = ['name', 'description', 'startTime', 'endTime', 'location'];
  agenda: Activity[];
  showShakeAnimation: boolean = false;
  rating: number = 0;
  isUserEligibleToRate: boolean = false;
  stars: number[] = [1, 2, 3, 4, 5];
  showStars: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private service: EventService,
    private dialog: MatDialog,
    private authService: AuthService,
    private chatService: ChatDialogService,
    private ratingService: RatingService
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');

    this.service.getEventDetails(this.id).pipe(
      switchMap((event: EventDetails) => {
        this.event = event;

        const fav$ = this.loggedIn ? this.service.isFavourite(this.id) : of(false);
        const agenda$ = this.service.getAgenda(this.id);

        return forkJoin({
          isFav: fav$,
          agenda: agenda$
        });
      })
    ).subscribe({
      next: ({ isFav, agenda }) => {
        this.isFavourite = isFav;
        this.agenda = agenda;
      },
      error: (_) => {
        this.showMessage("", "An error occurred while loading event details. Try again later.");
      }
    });

    this.service.isUserEligableToRate(this.id).subscribe({
      next: (isEligible: boolean) => this.isUserEligibleToRate = isEligible,
      error: (_) => this.isUserEligibleToRate = false
    })
    
    setTimeout(() => {
      this.showShakeAnimation = true;
      setTimeout(() => { this.showShakeAnimation = false; }, 500);
    }, 500);
  }

  showMessage(title: string, message: string) : void {
    this.dialog.open(InfoDialogComponent, {
      data: { title: title, message: message }
    })
  }

  get loggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get isOrganizer(): boolean {
    return (this.authService.getUserId() == this.event.organizer.id);
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

  rate(value: number): void {
    this.rating = value;
    this.ratingService.createRating(this.id, ReviewType.EVENT, value).subscribe({
      next: () => {
        this.showStars = false;
        this.showMessage("Thank you for your feedback!", `You rated the event ${value} star${value > 1 ? 's' : ''}.`);
      },
      error: () => {} 
    })
  }

  addToCalendar(): void  {
    this.service.addToCalendar(this.id).subscribe({
      next: (_) => {
        this.showMessage(MESSAGES.success, MESSAGES.addedToCalendar);
      }, error: (_) => {
        this.showMessage(ERROR_MESSAGES.GENERAL_ERROR, "");
      }
    })
  }

  exportDetailsToPDF() {
    this.exportToPDF('event_details.pdf', this.service.exportToPDF(this.id));
  }
  
  exportGuestListToPDF() {
    this.exportToPDF('guest_list.pdf', this.service.exportGuestListToPDF(this.id));
  }

  exportToPDF(fileName: string, exportMethod: Observable<Blob>) {
    exportMethod.subscribe({
      next: (blob: Blob) => {
        const fileURL = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = fileURL;
        link.download = fileName;
        link.click();
      }
    });
  }
   
}
