import { Component, OnInit } from '@angular/core';
import { Service } from '../model/service.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { ImageResponseDto } from '../../shared/model/image-response-dto.model';
import { forkJoin, switchMap } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ServiceReservationDialogComponent } from '../service-reservation-dialog/service-reservation-dialog.component';
import { EventSelectionComponent } from '../../shared/event-selection/event-selection.component';
import { Event } from '../../event/model/event.model';
import { CommentsDialogComponent } from '../../review/comments-dialog/comments-dialog.component';
import { ReviewType } from '../../review/model/review-type.enum';
import {SolutionType} from '../../budget/model/solution-type.enum';
import {BudgetItem} from '../../budget/model/budget-item.model';
import {BudgetService} from '../../budget/budget.service';
import {ChatService} from '../../shared/chat-dialog/chat.service';
import {ChatDialogService} from '../../shared/chat-dialog/chat-dialog.service';
import {UserDetails} from '../../user/model/user-details.model';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrl: './service-details.component.css'
})
export class ServiceDetailsComponent implements OnInit {

  service: Service
  isFavourite: boolean;

  serviceId: number;
  plannedAmount: number = 0;
  eventId: number;
  moveToBudget: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private serviceService: ServiceService,
    private authService: AuthService,
    private toasterService: ToastrService,
    private budgetService: BudgetService,
    private chatService: ChatDialogService,
    private router: Router,
    private dialog: MatDialog) { }

  get loggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  ngOnInit(): void {
    this.getParams();

    this.serviceService.get(this.serviceId).pipe(
      switchMap((service: Service) => {
        if (this.loggedIn) {
          return forkJoin([
            this.serviceService.get(this.serviceId),
            this.serviceService.getImages(service.id),
            this.serviceService.getIsFavourite(service.id)
          ]);
        } else {
          return forkJoin([
            this.serviceService.get(this.serviceId),
            this.serviceService.getImages(service.id)
          ]);
        }
      })
    ).subscribe({
      next: ([service, images, isFavourite]: [Service, ImageResponseDto[], boolean?]) => {
        this.service = service;
        if(this.loggedIn) {
          this.isFavourite = isFavourite;
        }
        this.service.images = images.map(image =>
          `data:${image.contentType};base64,${image.data}`
        );
      },
      error: (error: HttpErrorResponse) => this.handleError(error)
    });
  }

  getParams(): void {
    this.route.params.subscribe(params => this.serviceId = +params['id']);
    this.route.queryParams.subscribe(params => {
      if (params['eventId']) {
        this.eventId = +params['eventId'];
        this.plannedAmount = +params['plannedAmount'];
        this.moveToBudget = true;
      }
    });
  }

  get isProvider(): boolean {
    return (this.authService.getUserId() == this.service?.provider?.id);
  }

  onClick(): void{
    if (this.eventId)
      this.openReservationDialog();
    else
      this.openEventSelectionDialog();
  }

  private handleError(error: HttpErrorResponse): void {
    void this.router.navigate(['/error'], {
      queryParams: {
        code: error.status,
        message: error.error?.message || 'An unknown error occurred.'
      }
    });
  }

  getRole(): string { return this.authService.getRole(); }

  private openReservationDialog(): void {
    const dialogRef = this.dialog.open(ServiceReservationDialogComponent, {
      data: { eventId: this.eventId, serviceId: this.serviceId, plannedAmount: this.plannedAmount }
    });
    this.handleReservationClose(dialogRef);
  }

  openSeeCommentsDialog(): void {
      this.dialog.open(CommentsDialogComponent, { width: '450px', height: 'auto',
        data: {
          objectId: this.service?.id,
          reviewType: ReviewType.SERVICE
        }});
  }

  private openEventSelectionDialog(): void {
      const dialogRef = this.dialog.open(EventSelectionComponent, {
        width: '450px',
        height: 'auto',
        data: { type: SolutionType.SERVICE }
      });
      this.handleCloseDialog(dialogRef);
  }

  private handleReservationClose(dialogRef: MatDialogRef<ServiceReservationDialogComponent>): void {
    dialogRef.afterClosed().subscribe((_) => {
      if(this.moveToBudget) {
        void this.router.navigate(['budget-planning', this.eventId]);
      }
    });
  }

  private handleCloseDialog(dialogRef: MatDialogRef<EventSelectionComponent>): void {
    dialogRef.afterClosed().subscribe(({ plannedAmount, event }: { plannedAmount: number, event: Event }) => {
      if (!event) return;
      this.plannedAmount = plannedAmount;
      this.eventId = event.id;
      this.openReservationDialog()
    });
  }

  toggleFavouriteService(): void {
    if(this.isFavourite) {
      this.serviceService.removeFromFavourites(this.service.id).subscribe({
        next: () => {
          this.toasterService.info(`Removed ${this.service.name} from favourite services`, "Favourite services");
          this.isFavourite = false;
        }
      });
    } else {
      this.serviceService.addToFavourites(this.service.id).subscribe({
        next: () => {
          this.toasterService.success(`Added ${this.service.name} to favourite services`, "Favourite services");
          this.isFavourite = true;
        }
      });
    }
  }

  createBudgetItem(eventId: number, plannedAmount: number): void {
    if(plannedAmount < this.service.price * (1 - this.service.discount / 100)) {
      this.toasterService.error("Planned amount should be larger then price", "Error");
      return;
    }

    this.budgetService.createBudgetItem(eventId, {
      category: this.service.category,
      itemId: this.service.id,
      itemType: SolutionType.SERVICE,
      plannedAmount: plannedAmount
    }).subscribe({
      next: (item: BudgetItem) => {
        this.toasterService.success(`'${item.solutionName}' has been added to planner successfully`, "Success");
        if(this.eventId && this.plannedAmount)
          this.navigateBackToPlanner();
      },
      error: (error: HttpErrorResponse) => {
        this.toasterService.error(error.error.message, "Failed to add to budget planner");
      }
    });
  }

  navigateBackToPlanner(): void {
    void this.router.navigate(['budget-planning', this.eventId]);
  }

  openChatDialog(recipient?: UserDetails): void {
    this.chatService.openChatDialog(recipient || this.service.provider);
  }
}
