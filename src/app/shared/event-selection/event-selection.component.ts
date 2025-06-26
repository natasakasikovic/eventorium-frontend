import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EventSummary} from '../../event/model/event-summary.model';
import {EventService} from '../../event/event.service';
import {BudgetItem} from '../../budget/model/budget-item.model';
import {SolutionType} from '../../budget/model/solution-type.enum';

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
    private eventService: EventService,
    @Inject(MAT_DIALOG_DATA) public data: { type: SolutionType }
  ) {
  }

  ngOnInit(): void {
    this.eventService.getFutureEvents().subscribe({
      next: (events: EventSummary[]) => {
        this.events = events;
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close([null, null]);
  }

  onConfirm(addToPlanner: boolean): void {
    if(!this.selectEventForm.invalid) {
      this.dialogRef.close({
        addToPlanner,
        plannedAmount: this.selectEventForm.value.plannedAmount,
        event: this.selectEventForm.value.event
      });
    }
  }

  protected readonly SolutionType = SolutionType;
}
