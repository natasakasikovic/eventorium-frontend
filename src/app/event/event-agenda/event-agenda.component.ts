import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivityRequest } from '../model/activity-request.model';
import { AgendaRequest } from "../model/agenda-request.model";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Privacy } from '../model/privacy.enum';
import { HttpErrorResponse } from '@angular/common/http';
import { InfoDialogComponent } from '../../shared/info-dialog/info-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MESSAGES } from '../../shared/constants/messages';
import { ERROR_MESSAGES } from '../../shared/constants/error-messages';
import { ActivityRow } from '../model/activity-row.model';

@Component({
  selector: 'app-event-agenda',
  templateUrl: './event-agenda.component.html',
  styleUrl: './event-agenda.component.css'
})
export class EventAgendaComponent implements OnInit {
  id: number | null;
  displayedColumns: string[] = ['Activity name', 'Location', 'From', 'To', 'Description', 'X'];
  dataSource = new MatTableDataSource<ActivityRow>([]);
  agendaForm: FormGroup;
  privacy: Privacy;

  activities: ActivityRequest[] = [];
  activityRows: ActivityRow[] = [];

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadParams();
    this.loadEventPrivacy();

    this.agendaForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required],
      from: ['', Validators.required],
      to: ['', Validators.required]
    });
  }

  private loadParams(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'] ?? null;
    });
  }

  private loadEventPrivacy(): void {
    this.privacy = this.eventService.getEventPrivacy();
  }

  addActivity(name: string, location: string, description: string, startTime: string, endTime: string): void {
    const newActivity: ActivityRequest = {
      name,
      location,
      description,
      startTime,
      endTime,
    };

    const newRow: ActivityRow = {
      activity: newActivity,
      id: this.activityRows.length > 0 ? this.activityRows[this.activityRows.length - 1].id + 1 : 1
    };

    this.activities.push(newActivity);
    this.activityRows.push(newRow);
    this.dataSource.data = this.activityRows;
  }

  remove(row: ActivityRow): void {
    const index = this.activityRows.findIndex(r => r.id === row.id);
    if (index >= 0) {
      this.activityRows.splice(index, 1);
      this.activities.splice(index, 1);
      this.dataSource.data = this.activityRows;
    }
  }

  add(): void {
    if (this.agendaForm.valid) {
      const { name, location, description, from, to } = this.agendaForm.value;
      this.addActivity(name, location, description, from, to);
      this.agendaForm.reset();
    }
  }


  finish(): void {
    const agenda: AgendaRequest = { activities: this.activities };
    this.eventService.createAgenda(agenda, this.id).subscribe({
      next: () => {
        if (this.eventService.getEventPrivacy() === Privacy.CLOSED.toUpperCase()) {
          this.router.navigate(['event-invitations', this.id]);
        }
        else {
          this.showMessage(MESSAGES.success, MESSAGES.eventCreated);
          this.router.navigate(['']);
        }
      },
      error: (error : HttpErrorResponse) => {
        if (error.status == 400) {
          this.showMessage(ERROR_MESSAGES.GENERAL_ERROR, error.error.message);
        } else {
          this.showMessage(ERROR_MESSAGES.GENERAL_ERROR,  ERROR_MESSAGES.SERVER_ERROR);
        }
      }
    })
  }

  showMessage(title: string, message: string) : void {
    this.dialog.open(InfoDialogComponent, {
      data: {
        title: title,
        message: message
      }
    })
  }

  isClosed(): boolean {
    return this.privacy === Privacy.CLOSED.toUpperCase();
  }

}
