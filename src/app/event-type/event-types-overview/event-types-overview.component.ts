import { Component, OnInit } from '@angular/core';
import { EventType } from '../model/event-type.model';
import { EventTypeService } from '../event-type.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InfoDialogComponent } from '../../shared/info-dialog/info-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ERROR_MESSAGES } from '../../shared/constants/error-messages';

@Component({
  selector: 'app-event-types-overview',
  templateUrl: './event-types-overview.component.html',
  styleUrl: './event-types-overview.component.css'
})
export class EventTypesOverviewComponent implements OnInit {
  
  eventTypes: EventType[];

  constructor(
    private service: EventTypeService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.service.getAll().subscribe({
      next: (eventTypes: EventType[]) => {
        this.eventTypes = eventTypes;
      }
    })
  }

  onDelete(id: number): void {
    this.eventTypes = this.eventTypes.filter(eventType => eventType.id !== id);
    this.service.delete(id).subscribe({
      error: (_) => {
        this.showMessage(ERROR_MESSAGES.GENERAL_ERROR, "Error while deleting selected event type");
      }
    })
  }

  onEdit(id: number): void {
    this.router.navigate([`edit-event-type/${id}`])
  }

  showMessage(title: string, message: string) : void {
    this.dialog.open(InfoDialogComponent, {
      data: {
        title: title,
        message: message
      }
    })
  }
}
