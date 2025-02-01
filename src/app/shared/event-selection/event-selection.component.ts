import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Event} from '../../event/model/event.model';
import {EventSummary} from '../../event/model/event-summary.model';
import {EventService} from '../../event/event.service';

@Component({
  selector: 'app-event-selection',
  templateUrl: './event-selection.component.html',
  styleUrl: './event-selection.component.css'
})
export class EventSelectionComponent implements OnInit {
  events: EventSummary[];
  selectEventForm: FormGroup = new FormGroup({
    plannedAmount: new FormControl(0, [Validators.required, Validators.min(0)]),
    event: new FormControl('', Validators.required)
  });

  constructor(
    private dialogRef: MatDialogRef<EventSelectionComponent>,
    private eventService: EventService
  ) {
  }

  ngOnInit(): void {
    this.eventService.getDraftedEvents().subscribe({
      next: (events: EventSummary[]) => {
        this.events = events;
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close([null, null]);
  }

  onConfirm(): void {
    this.dialogRef.close({
      plannedAmount: this.selectEventForm.value.plannedAmount,
      event: this.selectEventForm.value.event
    });
  }

}
